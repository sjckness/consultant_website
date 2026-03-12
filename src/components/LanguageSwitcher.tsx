"use client";

import { useLanguage } from "@/lib/i18n";

const options = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white/80 px-1 py-1 shadow-sm text-xs font-semibold text-slate-700">
      {options.map((o) => (
        <button
          key={o.code}
          onClick={() => setLang(o.code as "en" | "de")}
          className={`rounded-full px-2.5 py-1 transition ${
            lang === o.code
              ? "bg-blue-600 text-white shadow"
              : "hover:bg-slate-100"
          }`}
          aria-pressed={lang === o.code}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
