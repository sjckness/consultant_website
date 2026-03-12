"use client";

import { useEffect, useState } from "react";

const claims = [
  "Strategia che diventa esecuzione",
  "Allineamento tra team, roadmap e budget",
  "Decisioni rapide, senza improvvisare",
];

export default function ClaimRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % claims.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block min-h-[1.25em] overflow-hidden align-middle">
      <span key={claims[index]} className="fade-text block text-blue-700">
        {claims[index]}
      </span>
    </span>
  );
}
