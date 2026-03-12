"use client";

import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";

export default function BlogHero() {
  const t = useT();
  return (
    <Reveal>
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
          {t("blogBadge")}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t("blogTitle")}
        </h1>
        <p className="text-lg leading-8 text-slate-700 max-w-3xl">
          {t("blogSubtitle")}
        </p>
      </header>
    </Reveal>
  );
}
