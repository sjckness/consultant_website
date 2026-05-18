"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const copy = {
  en: { back: "← Back to blog", locale: "en-GB" },
  de: { back: "← Zurück zum Blog", locale: "de-CH" },
};

export function BlogBackLink() {
  const { lang } = useLanguage();
  const c = copy[lang] ?? copy.de;
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition"
      style={{ color: "var(--ink-muted)" }}
    >
      {c.back}
    </Link>
  );
}

export function BlogPublishedDate({ iso }: { iso?: string }) {
  const { lang } = useLanguage();
  const c = copy[lang] ?? copy.de;
  if (!iso) return <>—</>;
  const formatted = new Intl.DateTimeFormat(c.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
  return <time className="tabular" dateTime={iso}>{formatted}</time>;
}
