"use client";

import { useLanguage } from "@/lib/i18n";

const options = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full px-0.5 py-0.5 text-[12px] font-semibold"
      style={{
        background: "rgba(0,0,0,0.04)",
        border: "1px solid var(--nav-rule)",
      }}
    >
      {options.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            onClick={() => setLang(o.code as "en" | "de")}
            className="rounded-full px-3 py-1.5 transition"
            style={{
              background: active ? "var(--nav-ink)" : "transparent",
              color: active ? "#ffffff" : "var(--nav-ink-soft)",
            }}
            aria-pressed={active}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
