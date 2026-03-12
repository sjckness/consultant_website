"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "de";

const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navExperience: "Experience",
    navFor: "For whom",
    navBlog: "Blog",
    navContact: "Contact",
    bookCall: "Book a call",
    contact: "Contact",
    navMenuOpen: "Open menu",
    navMenuClose: "Close menu",
    heroBadge: "Professional service",
    heroTitle: "Operational strategy to move your team forward",
    heroSubtitle:
      "A light but incisive partnership: clear decisions, shared priorities, delivery that doesn’t stop.",
    ctaSecondary: "See the method",
    servicesBadge: "Services",
    servicesTitle: "Done-with-you support that brings decisions and delivery.",
    servicesSubtitle:
      "Pick the right format: a sprint for clarity, a roadmap to guide execution, or recurring support to keep momentum.",
    blogBadge: "Blog",
    blogTitle: "Ideas, work notes and practical cases.",
    blogSubtitle:
      "Short, concrete posts: strategy, organisation, decision design, tools and methods I use daily.",
  },
  de: {
    navHome: "Start",
    navAbout: "Über mich",
    navServices: "Leistungen",
    navExperience: "Referenzen",
    navFor: "Für wen",
    navBlog: "Blog",
    navContact: "Kontakt",
    bookCall: "Termin buchen",
    contact: "Kontakt",
    navMenuOpen: "Menü öffnen",
    navMenuClose: "Menü schließen",
    heroBadge: "Professioneller Service",
    heroTitle: "Operative Strategie, die dein Team voranbringt",
    heroSubtitle:
      "Partnerschaftlich, klar und leichtgewichtig: schnelle Entscheidungen, gemeinsame Prioritäten, Delivery ohne Stopps.",
    ctaSecondary: "Methode ansehen",
    servicesBadge: "Leistungen",
    servicesTitle: "Begleitung, die Entscheidungen und Umsetzung voranbringt.",
    servicesSubtitle:
      "Wähle das passende Format: Sprint für Klarheit, Roadmap für Umsetzung, oder laufende Begleitung für Tempo.",
    blogBadge: "Blog",
    blogTitle: "Ideen, Work Notes und Praxis-Cases.",
    blogSubtitle:
      "Kurze, konkrete Beiträge: Strategie, Organisation, Decision Design, Tools und Methoden aus meinem Alltag.",
  },
};

type TranslationKey = keyof (typeof translations)["en"];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("langPref") : null;
    if (stored === "de" || stored === "en") {
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("langPref", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  const { lang } = useLanguage();
  const dict = translations[lang] || translations.en;
  return (key: TranslationKey) => dict[key] ?? translations.en[key];
}
