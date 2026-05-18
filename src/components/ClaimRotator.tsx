"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIndex(0);
    const id = setInterval(
      () => setIndex((i) => (i + 1) % claims.length),
      2800,
    );
    return () => clearInterval(id);
  }, [claims]);

  return (
    <span className="relative inline-block min-h-[1.25em] overflow-hidden align-middle">
      <span key={claims[index]} className="fade-text block text-blue-700">
        {claims[index]}
      </span>
    </span>
  );
}
