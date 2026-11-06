/* Texteditor — Steffens Infraport Consulting
 * Tiene la "bozza" dei testi, mostra il sito vero in un iframe (che lo rende
 * modificabile, vedi src/lib/textEditMode.ts) e salva tramite /api/save.php. */
(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const LANGS = ["de", "en"];
  const frame = $("#site");
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const emptyTexts = () => ({ de: {}, en: {} });

  let saved = emptyTexts();
  let draft = emptyTexts();
  let frameStarted = false;

  // ---------- rete ----------
  async function api(url, body) {
    const opts = { credentials: "same-origin", cache: "no-store" };
    if (body !== undefined) {
      opts.method = "POST";
      opts.headers = { "Content-Type": "application/json", "X-SIC": "1" };
      opts.body = JSON.stringify(body);
    }
    try {
      const res = await fetch(url, opts);
      let data = null;
      try {
        data = await res.json();
      } catch (_) {
        /* risposta non JSON */
      }
      return { ok: res.ok, status: res.status, data };
    } catch (_) {
      return { ok: false, status: 0, data: null };
    }
  }

  function normalize(texts) {
    const out = emptyTexts();
    for (const l of LANGS) {
      const src = texts && texts[l];
      if (src && typeof src === "object") {
        for (const [k, v] of Object.entries(src)) if (typeof v === "string") out[l][k] = v;
      }
    }
    return out;
  }

  // ---------- stato ----------
  function changeCount() {
    let n = 0;
    for (const l of LANGS) {
      const keys = new Set([...Object.keys(saved[l]), ...Object.keys(draft[l])]);
      for (const k of keys) if (saved[l][k] !== draft[l][k]) n++;
    }
    return n;
  }

  function refresh() {
    const n = changeCount();
    const status = $("#status");
    $("#btn-save").disabled = n === 0;
    $("#btn-discard").disabled = n === 0;
    $("#btn-save").textContent = n ? `Speichern (${n})` : "Speichern";
    status.textContent = n
      ? `${n} nicht gespeicherte Änderung${n === 1 ? "" : "en"}`
      : "Zum Bearbeiten auf einen Text klicken";
    status.classList.toggle("dirty", n > 0);
  }

  let toastTimer = 0;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3800);
  }

  function syncControls(lang, path) {
    document.querySelectorAll(".seg button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    const select = $("#page");
    const p = !path || path === "" ? "/" : path.replace(/\/$/, "") || "/";
    if ([...select.options].some((o) => o.value === p)) select.value = p;
  }

  // API usata dall'iframe (src/lib/editorFrame.ts)
  window.__SIC_EDITOR__ = {
    getDraft: () => draft,
    setText(lang, key, value) {
      if (!draft[lang]) draft[lang] = {};
      if (value === null) delete draft[lang][key];
      else draft[lang][key] = value;
      refresh();
    },
    onFrameState({ lang, path }) {
      syncControls(lang, path);
    },
    toast,
  };

  // ---------- iframe ----------
  function loadFrame(path) {
    frameStarted = true;
    frame.src = path;
  }

  frame.addEventListener("load", () => {
    try {
      const doc = frame.contentDocument;
      syncControls(doc.documentElement.lang, frame.contentWindow.location.pathname);
      doc.addEventListener("keydown", onKeydown);
    } catch (_) {
      /* altra origine: non dovrebbe succedere */
    }
  });

  function setLang(lang) {
    try {
      localStorage.setItem("langPref", lang);
    } catch (_) {
      /* ignorato */
    }
    syncControls(lang);
    if (frameStarted) frame.contentWindow.location.reload();
  }

  document.querySelectorAll(".seg button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });
  $("#page").addEventListener("change", (e) => loadFrame(e.target.value));

  // ---------- azioni ----------
  async function save() {
    if (changeCount() === 0) return;
    const btn = $("#btn-save");
    btn.disabled = true;
    btn.textContent = "Speichert …";
    const res = await api("/api/save.php", { texts: draft });
    if (res.status === 401) {
      showLogin("Die Sitzung ist abgelaufen. Bitte neu anmelden – Ihre Änderungen bleiben erhalten.");
    } else if (res.ok) {
      saved = clone(draft);
      toast("Gespeichert – die Änderungen sind jetzt online.");
    } else {
      toast("Speichern fehlgeschlagen. Bitte erneut versuchen.");
    }
    refresh();
  }

  function discard() {
    if (!confirm("Alle nicht gespeicherten Änderungen verwerfen?")) return;
    draft = clone(saved);
    refresh();
    frame.contentWindow.location.reload();
  }

  async function logout() {
    if (changeCount() > 0 && !confirm("Es gibt nicht gespeicherte Änderungen. Trotzdem abmelden?")) return;
    await api("/api/auth.php?a=logout", {});
    draft = clone(saved);
    frame.removeAttribute("src");
    frameStarted = false;
    $("#app").hidden = true;
    showLogin("");
  }

  function onKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      save();
    }
  }
  document.addEventListener("keydown", onKeydown);

  window.addEventListener("beforeunload", (e) => {
    if (changeCount() > 0) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  $("#btn-save").addEventListener("click", save);
  $("#btn-discard").addEventListener("click", discard);
  $("#btn-logout").addEventListener("click", logout);
  $("#btn-help").addEventListener("click", () => $("#dlg-help").showModal());

  // ---------- versioni ----------
  async function openVersions() {
    const list = $("#versions-list");
    list.innerHTML = "";
    const res = await api("/api/backups.php");
    if (res.status === 401) return showLogin("Bitte neu anmelden.");
    if (!res.ok || !res.data) return toast("Versionen konnten nicht geladen werden.");
    const items = Object.values(res.data.backups || {});
    if (!items.length) {
      const li = document.createElement("li");
      li.textContent = "Noch keine früheren Versionen.";
      list.appendChild(li);
    }
    for (const b of items) {
      const li = document.createElement("li");
      const when = document.createElement("span");
      when.className = "when";
      when.textContent = b.label + " ";
      const small = document.createElement("small");
      small.textContent = `(${b.entries} geänderte Texte)`;
      when.appendChild(small);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Wiederherstellen";
      btn.addEventListener("click", () => restore(b));
      li.append(when, btn);
      list.appendChild(li);
    }
    $("#dlg-versions").showModal();
  }

  async function restore(b) {
    const warn = changeCount() > 0 ? "\n\nNicht gespeicherte Änderungen gehen dabei verloren." : "";
    if (!confirm(`Stand vom ${b.label} wiederherstellen?${warn}`)) return;
    const res = await api("/api/backups.php", { id: b.id });
    if (res.status === 401) return showLogin("Bitte neu anmelden.");
    if (!res.ok || !res.data) return toast("Wiederherstellen fehlgeschlagen.");
    saved = normalize(res.data.texts);
    draft = clone(saved);
    $("#dlg-versions").close();
    refresh();
    frame.contentWindow.location.reload();
    toast("Frühere Version wiederhergestellt und gespeichert.");
  }
  $("#btn-versions").addEventListener("click", openVersions);

  // ---------- login ----------
  function showLogin(message) {
    $("#login").hidden = false;
    $("#login-msg").textContent = message || "";
    $("#pw").value = "";
    $("#pw").focus();
  }

  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("#login-btn");
    btn.disabled = true;
    const res = await api("/api/auth.php?a=login", { password: $("#pw").value });
    btn.disabled = false;
    if (res.ok) {
      $("#login").hidden = true;
      enterApp();
    } else if (res.status === 429) {
      const min = Math.ceil(((res.data && res.data.retryAfter) || 900) / 60);
      showLogin(`Zu viele Versuche. Bitte in ca. ${min} Minuten erneut versuchen.`);
    } else if (res.status === 401) {
      showLogin("Falsches Passwort.");
    } else {
      showLogin("Anmeldung nicht möglich (Server nicht erreichbar).");
    }
  });

  function enterApp() {
    $("#app").hidden = false;
    refresh();
    if (!frameStarted) {
      let lang = "de";
      try {
        lang = localStorage.getItem("langPref") === "en" ? "en" : "de";
      } catch (_) {
        /* ignorato */
      }
      syncControls(lang);
      loadFrame($("#page").value);
    }
  }

  // ---------- avvio ----------
  (async function boot() {
    const [t, s] = await Promise.all([api("/api/texts.php"), api("/api/auth.php?a=status")]);
    if (!t.ok || !t.data || !s.ok || !s.data) {
      showLogin("Der Server (PHP) antwortet nicht. Bitte später erneut versuchen.");
      $("#login-btn").disabled = true;
      return;
    }
    saved = normalize(t.data.texts);
    draft = clone(saved);
    if (!s.data.configured) {
      showLogin("Das Passwort ist noch nicht eingerichtet (config.php fehlt).");
      $("#login-btn").disabled = true;
      return;
    }
    if (s.data.authed) enterApp();
    else showLogin("");
  })();
})();
