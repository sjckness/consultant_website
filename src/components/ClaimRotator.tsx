"use client";

import { useEffect, useState } from "react";
import { useEditorFrame } from "@/lib/editorFrame";
import { useLanguage } from "@/lib/i18n";

const claimsByLang = {
  de: [
    "Portfolio führen, Projekte erfolgreich umsetzen",
    "Bahninfrastruktur mit Erfahrung steuern",
    "Multidisziplinäre Vorhaben strukturiert führen",
  ],
  en: [
    "Lead the portfolio, deliver the projects",
    "Steer rail infrastructure with experience",
    "Run multi-disciplinary projects with structure",
  ],
};

export default function ClaimRotator() {
  const { lang } = useLanguage();
  const claims = claimsByLang[lang] ?? claimsByLang.de;
  const [index, setIndex] = useState(0);
  const inEditor = useEditorFrame();

  useEffect(() => {
    setIndex(0);
    if (inEditor) return; // nell'editor niente rotazione: tutte le frasi sono modificabili
    const id = setInterval(
      () => setIndex((i) => (i + 1) % claims.length),
      2800,
    );
    return () => clearInterval(id);
  }, [claims, inEditor]);

  if (inEditor) {
    return (
      <span className="block text-blue-700">
        {claims.map((claim) => (
          <span key={claim} className="block">
            {claim}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="relative inline-block min-h-[1.25em] overflow-hidden align-middle">
      <span key={claims[index]} className="fade-text block text-blue-700">
        {claims[index]}
      </span>
    </span>
  );
}
