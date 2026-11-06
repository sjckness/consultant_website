/**
 * Runtime per i testi modificabili.
 *
 * Il sito è un export statico: i testi originali stanno nel codice. I testi
 * modificati dall'editor (/editor) sono salvati da PHP in /api/texts.php come
 *   { de: { "testo originale": "testo nuovo" }, en: { ... } }
 * Qui li applichiamo ai nodi di testo del DOM dopo l'hydration. La chiave è il
 * testo originale normalizzato (spazi collassati), quindi non serve toccare i
 * componenti e funziona anche per le stringhe scritte direttamente nel JSX.
 */

export type Texts = Record<string, Record<string, string>>;

type Rec = { orig: string; set: string };

/**
 * Per ogni nodo di testo: `orig` = testo come l'ha renderizzato React,
 * `set` = ultimo valore che abbiamo scritto (o visto). Se `node.data !== set`
 * React ha cambiato il nodo (es. cambio lingua) e il record va rifatto.
 */
export const applied = new WeakMap<Text, Rec>();

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "TITLE"]);

export const normKey = (s: string) => s.replace(/\s+/g, " ").trim();

export function splitWs(s: string) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
  return { lead: m?.[1] ?? "", core: m?.[2] ?? s, trail: m?.[3] ?? "" };
}

export function textNodes(root: Node): Text[] {
  const out: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p || SKIP_TAGS.has(p.tagName) || p.closest("[data-sic-ignore]")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    out.push(n as Text);
  }
  return out;
}

export function applyTexts(
  root: Node,
  texts: Texts,
  lang: string,
  skip?: (node: Text) => boolean,
) {
  const map = texts[lang] ?? {};
  for (const node of textNodes(root)) {
    if (skip?.(node)) continue;

    let rec = applied.get(node);
    if (!rec || node.data !== rec.set) {
      // nodo nuovo, oppure React ne ha cambiato il contenuto
      if (!splitWs(node.data).core) {
        applied.delete(node);
        continue;
      }
      rec = { orig: node.data, set: node.data };
      applied.set(node, rec);
    }

    const { lead, trail } = splitWs(rec.orig);
    const key = normKey(rec.orig);
    const want = Object.hasOwn(map, key) ? map[key] : undefined;

    if (want === undefined) {
      if (node.data !== rec.orig) node.data = rec.orig;
      rec.set = node.data;
      continue;
    }
    if (normKey(node.data) === normKey(want)) {
      rec.set = node.data; // già giusto (non toccare gli spazi mentre si scrive)
      continue;
    }
    const next = lead + want + trail;
    node.data = next;
    rec.set = next;
  }
}

export type RunnerHooks = {
  skip?: (node: Text) => boolean;
  afterApply?: () => void;
};

export function createRunner(getTexts: () => Texts, hooks: RunnerHooks = {}) {
  let raf = 0;
  const run = () => {
    raf = 0;
    applyTexts(
      document.body,
      getTexts(),
      document.documentElement.lang,
      hooks.skip,
    );
    hooks.afterApply?.();
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(run);
  };
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  schedule();
  return {
    schedule,
    stop() {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    },
  };
}

export function parseTexts(json: unknown): Texts | null {
  if (!json || typeof json !== "object") return null;
  const src = (json as { texts?: unknown }).texts;
  if (!src || typeof src !== "object") return null;
  const out: Texts = {};
  for (const [lang, entries] of Object.entries(
    src as Record<string, unknown>,
  )) {
    if (!entries || typeof entries !== "object") continue;
    const clean: Record<string, string> = {};
    for (const [k, v] of Object.entries(entries as Record<string, unknown>)) {
      if (typeof v === "string") clean[k] = v;
    }
    out[lang] = clean;
  }
  return out;
}

export async function fetchSavedTexts(): Promise<Texts | null> {
  try {
    const res = await fetch("/api/texts.php", { cache: "no-cache" });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("json")) return null;
    return parseTexts(await res.json());
  } catch {
    return null;
  }
}
