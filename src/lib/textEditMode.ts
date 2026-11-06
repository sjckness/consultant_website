/**
 * Modalità di modifica: attiva SOLO quando il sito è caricato dentro l'iframe
 * di /editor (stessa origine). Rende i testi modificabili in loco e riporta le
 * modifiche all'editor, che le tiene in una "bozza" finché non si salva.
 */

import type { EditorApi } from "@/lib/editorFrame";
import { applied, createRunner, normKey, textNodes } from "@/lib/textOverrides";

const CSS = `
.reveal{opacity:1!important;transform:none!important;transition:none!important}
[data-sic-edit]{outline:1.5px dashed transparent;outline-offset:3px;cursor:text;transition:outline-color .15s}
[data-sic-edit]:hover{outline-color:rgba(37,99,235,.6)}
[data-sic-edit][data-sic-changed]{outline-color:rgba(234,88,12,.75)}
[data-sic-edit]:focus{outline:2px solid #2563eb;background:rgba(37,99,235,.07)}
#sic-chip{position:fixed;z-index:2147483647;display:none;font:600 12px/1 system-ui,sans-serif;
  background:#111827;color:#fff;border-radius:999px;padding:7px 12px;cursor:pointer;
  box-shadow:0 6px 20px rgba(0,0,0,.25);user-select:none}
`;

const clean = (s: string) => s.replace(/ /g, " ").replace(/\s+/g, " ").trim();

export function startEditMode(api: EditorApi) {
  const path = location.pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/blog/")) {
    api.toast?.("Blogbeiträge werden in Sanity bearbeitet, nicht hier.");
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-sic-ignore", "");
  style.textContent = CSS;
  document.head.appendChild(style);

  const chip = document.createElement("div");
  chip.id = "sic-chip";
  chip.setAttribute("data-sic-ignore", "");
  chip.textContent = "↺ Original wiederherstellen";
  document.body.appendChild(chip);

  const plainOnly = (() => {
    const probe = document.createElement("div");
    probe.contentEditable = "plaintext-only";
    return probe.contentEditable === "plaintext-only";
  })();

  const focusedEl = () => {
    const a = document.activeElement;
    return a instanceof HTMLElement && a.hasAttribute("data-sic-edit")
      ? a
      : null;
  };

  // Solo testi "veri": con almeno una lettera/cifra e non decorativi (es. la freccia →)
  const isEditableText = (node: Text) =>
    /[\p{L}\p{N}]/u.test(node.data) &&
    !node.parentElement?.closest('[aria-hidden="true"]');

  const ownTextNodes = (el: Element) =>
    Array.from(el.childNodes).filter(
      (n): n is Text => n.nodeType === 3 && isEditableText(n as Text),
    );

  // Testi originali di ogni elemento (aggiornato quando l'elemento non è in modifica).
  // Serve perché Chrome, se si seleziona tutto e si scrive, SOSTITUISCE il nodo di
  // testo con uno nuovo: il nuovo nodo va riassociato al suo originale per posizione.
  const origins = new WeakMap<Element, string[]>();

  const recFor = (el: Element, nodes: Text[], i: number) => {
    const t = nodes[i];
    let rec = applied.get(t);
    if (!rec) {
      const snap = origins.get(el);
      if (!snap || snap.length !== nodes.length) return undefined;
      rec = { orig: snap[i], set: t.data };
      applied.set(t, rec);
    }
    return rec;
  };

  const refreshChanged = (el: HTMLElement) => {
    const nodes = ownTextNodes(el);
    const changed = nodes.some((t, i) => {
      const rec = recFor(el, nodes, i);
      return !!rec && normKey(rec.orig) !== normKey(t.data);
    });
    if (changed) el.setAttribute("data-sic-changed", "");
    else el.removeAttribute("data-sic-changed");
    return changed;
  };

  const runner = createRunner(() => api.getDraft(), {
    skip: (node) => !!node.parentElement && node.parentElement === focusedEl(),
    afterApply() {
      for (const node of textNodes(document.body)) {
        const el = node.parentElement;
        if (!el || !isEditableText(node)) continue;
        if (!el.hasAttribute("data-sic-edit")) {
          el.setAttribute("data-sic-edit", "");
          el.contentEditable = plainOnly ? "plaintext-only" : "true";
          el.spellcheck = true;
        }
        if (el.lang !== document.documentElement.lang)
          el.lang = document.documentElement.lang;
        if (el !== focusedEl()) {
          const nodes = ownTextNodes(el);
          origins.set(
            el,
            nodes.map((t) => applied.get(t)?.orig ?? t.data),
          );
        }
        refreshChanged(el);
      }
      api.onFrameState?.({
        lang: document.documentElement.lang,
        path,
      });
    },
  });

  const commit = (el: HTMLElement) => {
    const lang = document.documentElement.lang;
    const nodes = ownTextNodes(el);
    for (let i = 0; i < nodes.length; i++) {
      const t = nodes[i];
      const rec = recFor(el, nodes, i);
      if (!rec) continue;
      const key = normKey(rec.orig);
      const value = clean(t.data);
      if (!value) continue;
      api.setText(lang, key, value === key ? null : value);
      rec.set = t.data;
    }
    refreshChanged(el);
    placeChip(el);
    runner.schedule(); // propaga la modifica agli stessi testi altrove (menu, footer…)
  };

  const placeChip = (el: HTMLElement | null) => {
    if (!el || !el.hasAttribute("data-sic-changed")) {
      chip.style.display = "none";
      return;
    }
    const r = el.getBoundingClientRect();
    chip.style.display = "block";
    chip.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - 230))}px`;
    chip.style.top = `${Math.max(8, r.top - 34)}px`;
  };

  const resetEl = (el: HTMLElement) => {
    const lang = document.documentElement.lang;
    const nodes = ownTextNodes(el);
    for (let i = 0; i < nodes.length; i++) {
      const t = nodes[i];
      const rec = recFor(el, nodes, i);
      if (!rec) continue;
      api.setText(lang, normKey(rec.orig), null);
      t.data = rec.orig;
      rec.set = rec.orig;
    }
    refreshChanged(el);
    chip.style.display = "none";
    runner.schedule();
  };

  // — eventi —
  document.addEventListener(
    "click",
    (e) => {
      if ((e.target as Element | null)?.closest("a")) e.preventDefault(); // si naviga dalla barra dell'editor
    },
    true,
  );

  document.addEventListener("focusin", (e) => {
    const el = (e.target as Element | null)?.closest?.("[data-sic-edit]");
    placeChip(el instanceof HTMLElement ? el : null);
  });
  document.addEventListener("focusout", (e) => {
    const el = (e.target as Element | null)?.closest?.("[data-sic-edit]");
    if (el instanceof HTMLElement) commit(el);
    chip.style.display = "none";
    runner.schedule();
  });
  document.addEventListener("input", (e) => {
    const el = (e.target as Element | null)?.closest?.("[data-sic-edit]");
    if (el instanceof HTMLElement) commit(el);
  });

  chip.addEventListener("mousedown", (e) => {
    e.preventDefault(); // non far perdere il focus
    const el = focusedEl();
    if (el) resetEl(el);
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      (e.target as Element | null)?.closest?.("[data-sic-edit]")
    ) {
      e.preventDefault();
    }
  });
  document.addEventListener("dragstart", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => e.preventDefault());

  // La selezione resta dentro un solo frammento di testo: così "seleziona tutto"
  // o il triplo clic seguiti da digitazione sostituiscono quel testo senza rompere
  // gli elementi vicini (link, frecce, grassetti).
  const firstEditableChild = (el: Node, from = 0): Text | null => {
    for (let i = from; i < el.childNodes.length; i++) {
      const n = el.childNodes[i];
      if (n.nodeType === 3 && isEditableText(n as Text)) return n as Text;
    }
    return null;
  };
  document.addEventListener("keydown", (e) => {
    const host = (e.target as Element | null)?.closest?.("[data-sic-edit]");
    if (!host || !(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "a")
      return;
    e.preventDefault(); // "seleziona tutto" = tutto il frammento di testo corrente
    const sel = document.getSelection();
    if (!sel) return;
    let node = sel.anchorNode?.nodeType === 3 ? (sel.anchorNode as Text) : null;
    if (!node || !isEditableText(node)) node = firstEditableChild(host);
    if (node) sel.setBaseAndExtent(node, 0, node, node.data.length);
  });
  document.addEventListener("selectionchange", () => {
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const r = sel.getRangeAt(0);
    const startEl =
      r.startContainer.nodeType === 3
        ? r.startContainer.parentElement
        : (r.startContainer as Element);
    if (!startEl?.closest("[data-sic-edit]")) return;

    let node: Text | null = null;
    let offset = r.startOffset;
    if (r.startContainer.nodeType === 3) {
      node = r.startContainer as Text;
      if (!isEditableText(node)) return;
    } else {
      node = firstEditableChild(r.startContainer, r.startOffset);
      offset = 0;
    }
    if (!node) return;
    if (r.endContainer !== node || r.startContainer !== node) {
      sel.setBaseAndExtent(node, offset, node, node.data.length);
    }
  });

  // Impedisce modifiche strutturali (unire/dividere nodi, svuotare del tutto un testo)
  document.addEventListener("beforeinput", (e) => {
    const el = (e.target as Element | null)?.closest?.("[data-sic-edit]");
    if (!el) return;
    const type = e.inputType;
    const block = (msg?: string) => {
      e.preventDefault();
      if (msg) api.toast?.(msg);
    };

    if (
      type === "insertParagraph" ||
      type === "insertLineBreak" ||
      type.startsWith("format")
    ) {
      return block();
    }
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const r = sel.getRangeAt(0);

    if (
      r.startContainer !== r.endContainer ||
      r.startContainer.nodeType !== 3
    ) {
      return block("Bitte nur innerhalb eines Textabschnitts ändern.");
    }
    const len = (r.startContainer as Text).data.length;
    if (type.startsWith("delete")) {
      if (r.collapsed) {
        if (len <= 1) return block();
        if (type === "deleteContentBackward" && r.startOffset === 0)
          return block();
        if (type === "deleteContentForward" && r.startOffset >= len)
          return block();
      } else if (r.endOffset - r.startOffset >= len) {
        return block(
          "Ein Text darf nicht komplett leer sein – bitte neu überschreiben.",
        );
      }
    }
  });

  // Incolla solo testo semplice (anche se il browser non supporta plaintext-only)
  document.addEventListener("paste", (e) => {
    const el = (e.target as Element | null)?.closest?.("[data-sic-edit]");
    if (!el) return;
    e.preventDefault();
    const text = clean(e.clipboardData?.getData("text/plain") ?? "");
    if (text) document.execCommand("insertText", false, text);
  });

  window.addEventListener("scroll", () => placeChip(focusedEl()), {
    passive: true,
  });
}
