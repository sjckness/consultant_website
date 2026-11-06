"use client";

import { useEffect } from "react";
import { getEditorApi } from "@/lib/editorFrame";
import { createRunner, fetchSavedTexts } from "@/lib/textOverrides";

/**
 * Applica i testi salvati dall'editor (/editor → /api/texts.php).
 * Se il sito è caricato dentro l'iframe dell'editor, attiva invece la modalità
 * di modifica (modulo caricato in modo dinamico: i visitatori non lo scaricano).
 * Se l'API non risponde (es. in `next dev`), non succede nulla.
 */
export default function TextOverrides() {
  useEffect(() => {
    let stop = () => {};
    let cancelled = false;

    const editor = getEditorApi();
    if (editor) {
      import("@/lib/textEditMode").then((m) => {
        if (!cancelled) m.startEditMode(editor);
      });
    } else {
      fetchSavedTexts().then((texts) => {
        if (cancelled || !texts) return;
        const hasAny = Object.values(texts).some(
          (m) => Object.keys(m).length > 0,
        );
        if (!hasAny) return;
        stop = createRunner(() => texts).stop;
      });
    }

    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return null;
}
