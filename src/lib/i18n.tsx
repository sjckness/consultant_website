"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "de";

const translations = {
  en: {
    brand: "Steffens Infraport Consulting",
    brandShort: "Steffens Infraport",
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navExperience: "References",
    navFor: "Industries",
    navBlog: "Blog",
    navContact: "Contact",
    bookCall: "Book a call",
    contact: "Contact",
    navMenuOpen: "Open menu",
    navMenuClose: "Close menu",
    heroBadge: "Infrastructure consulting",
    heroTitle: "Infrastructure in focus. Portfolios under control. Projects delivered.",
    heroSubtitle:
      "I support owners, infrastructure operators and public clients in the strategic planning, steering and delivery of demanding infrastructure projects and construction portfolios — with a particular focus on rail infrastructure and multi-disciplinary undertakings.",
    heroCtaPrimary: "Get in touch",
    heroCtaSecondary: "Discover services",
    heroFocus: "Today's focus:",
    servicesBadge: "Services",
    servicesTitle: "Experience, structure and leadership for complex infrastructure portfolios.",
    servicesSubtitle:
      "Six advisory areas — from portfolio governance to project rescue — built on more than 20 years in rail and civil engineering.",
    blogBadge: "Blog",
    blogTitle: "Notes from the field: rail, portfolio and project leadership.",
    blogSubtitle:
      "Short, practice-driven posts on infrastructure delivery, BIM, sustainability and stakeholder management.",
  },
  de: {
    brand: "Steffens Infraport Consulting",
    brandShort: "Steffens Infraport",
    navHome: "Start",
    navAbout: "Über mich",
    navServices: "Leistungen",
    navExperience: "Referenzen",
    navFor: "Branchen & Zielgruppen",
    navBlog: "Blog",
    navContact: "Kontakt",
    bookCall: "Kontakt aufnehmen",
    contact: "Kontakt",
    navMenuOpen: "Menü öffnen",
    navMenuClose: "Menü schließen",
    heroBadge: "Infrastrukturberatung",
    heroTitle: "Infrastruktur im Blick. Portfolio führen. Projekte erfolgreich umsetzen.",
    heroSubtitle:
      "Ich unterstütze Bauherren, Infrastrukturbetreiber und öffentliche Auftraggeber bei der strategischen Planung, Steuerung und Umsetzung anspruchsvoller Infrastrukturprojekte und Bauportfolien – mit besonderem Fokus auf Bahninfrastruktur und multidisziplinäre Vorhaben.",
    heroCtaPrimary: "Kontakt aufnehmen",
    heroCtaSecondary: "Leistungen entdecken",
    heroFocus: "Heutiger Fokus:",
    servicesBadge: "Leistungen",
    servicesTitle: "Erfahrung, Struktur und Führung für komplexe Infrastrukturportfolios.",
    servicesSubtitle:
      "Sechs Beratungsfelder – von der Portfoliosteuerung bis zur Projektsanierung – fundiert durch mehr als 20 Jahre Erfahrung im Bahn- und Bauingenieurwesen.",
    blogBadge: "Blog",
    blogTitle: "Notizen aus der Praxis: Bahn, Portfolio und Projektführung.",
    blogSubtitle:
      "Kurze, praxisnahe Beiträge zu Infrastrukturumsetzung, BIM, Nachhaltigkeit und Stakeholdermanagement.",
  },
};

type TranslationKey = keyof (typeof translations)["en"];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "de",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");

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
