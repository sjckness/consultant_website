"use client";

import { useEffect, useState } from "react";
import type { Texts } from "@/lib/textOverrides";

export type EditorApi = {
  getDraft(): Texts;
  setText(lang: string, key: string, value: string | null): void;
  onFrameState?(state: { lang: string; path: string }): void;
  toast?(message: string): void;
};

type EditorWindow = Window & { __SIC_EDITOR__?: EditorApi };

/** API dell'editor se (e solo se) il sito è dentro l'iframe di /editor. */
export function getEditorApi(): EditorApi | null {
  try {
    if (window.parent === window) return null;
    const frame = window.frameElement;
    if (!frame || !frame.hasAttribute("data-sic-editor")) return null;
    return (window.parent as EditorWindow).__SIC_EDITOR__ ?? null;
  } catch {
    return null; // iframe di un'altra origine: accesso negato
  }
}

/** true solo dentro l'editor (dopo l'hydration). Serve a fermare rotazioni/slider. */
export function useEditorFrame() {
  const [inEditor, setInEditor] = useState(false);
  useEffect(() => setInEditor(getEditorApi() !== null), []);
  return inEditor;
}
