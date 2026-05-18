import type { CarouselSlide } from "@/components/HomeCarousel";

export type Lang = "en" | "de";

export type HomeCopy = {
  kicker: string;
  heroTitle: string;
  heroLead: string;
  heroFocus: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { label: string; value: string }[];
  cards: { title: string; text: string }[];
  whyTitle: string;
  whyText: string;
  proofTitle: string;
  proofText: string;
  strengths: string[];
  slideMetas: string[];
};

export const homeCopy: Record<Lang, HomeCopy> = {
  en: {
    kicker: "Infrastructure consulting",
    heroTitle:
      "Infrastructure in focus. Portfolios under control. Projects delivered.",
    heroLead:
      "I support owners, infrastructure operators and public clients in the strategic planning, steering and delivery of demanding infrastructure projects and construction portfolios — with a particular focus on rail infrastructure and multi-disciplinary undertakings.",
    heroFocus: "Today's focus:",
    ctaPrimary: "Get in touch",
    ctaSecondary: "Discover services",
    stats: [
      { label: "Project volume managed", value: "CHF 1.2 bn+" },
      { label: "Years of rail experience", value: "15+" },
      { label: "Projects accompanied", value: "200+" },
    ],
    cards: [
      {
        title: "Who it's for",
        text: "Public clients, infrastructure operators and planning offices that need senior-level steering of complex construction portfolios.",
      },
      {
        title: "What you get",
        text: "Strategic direction, financial and risk control of the portfolio, and reliable delivery on time, cost and quality.",
      },
      {
        title: "How it works",
        text: "We assess your context, agree the goal, and I take responsibility for structure, decisions and execution alongside your team.",
      },
    ],
    whyTitle: "Why work with me?",
    whyText:
      "Civil engineer with 20+ years of international experience, IPMA Level A programme manager, MBA, and former Head of Track Region East at SBB — leading 60 staff and a CHF 200 mio. annual investment volume. I bring engineering depth, leadership and a clear sense of priorities.",
    proofTitle: "What I commit to",
    proofText:
      "A clear assessment after the first weeks: where the portfolio stands, which risks need decisions, and the exact next steps. No theatre, no oversized governance.",
    strengths: [
      "Specialist for substance preservation & renewal",
      "BAV-experienced (plan-approval procedures)",
      "Programme & portfolio governance",
    ],
    slideMetas: ["Audience", "Outcome", "Method"],
  },
  de: {
    kicker: "Infrastrukturberatung",
    heroTitle:
      "Infrastruktur im Blick. Portfolio führen. Projekte erfolgreich umsetzen.",
    heroLead:
      "Ich unterstütze Bauherren, Infrastrukturbetreiber und öffentliche Auftraggeber bei der strategischen Planung, Steuerung und Umsetzung anspruchsvoller Infrastrukturprojekte und Bauportfolien – mit besonderem Fokus auf Bahninfrastruktur und multidisziplinäre Vorhaben.",
    heroFocus: "Heutiger Fokus:",
    ctaPrimary: "Kontakt aufnehmen",
    ctaSecondary: "Leistungen entdecken",
    stats: [
      { label: "Betreutes Projektvolumen", value: "CHF 1.2 Mrd.+" },
      { label: "Jahre Bahnerfahrung", value: "15+" },
      { label: "Begleitete Projekte", value: "200+" },
    ],
    cards: [
      {
        title: "Für wen",
        text: "Öffentliche Bauherren, Infrastrukturbetreiber und Planungsbüros, die senior Führung in anspruchsvollen Bauportfolien brauchen.",
      },
      {
        title: "Was Sie bekommen",
        text: "Strategische Ausrichtung, finanzielle und risikobezogene Steuerung des Portfolios sowie verlässliche Termin-, Kosten- und Qualitätskontrolle.",
      },
      {
        title: "Wie es läuft",
        text: "Ich analysiere die Ausgangslage, kläre Ziel und Auftrag und übernehme Verantwortung für Struktur, Entscheidungen und Umsetzung – Schulter an Schulter mit Ihrem Team.",
      },
    ],
    whyTitle: "Warum mit mir?",
    whyText:
      "Bauingenieur mit über 20 Jahren internationaler Erfahrung, IPMA-zertifizierter Programmmanager (Level A), MBA und ehemaliger Leiter Fahrbahn Region Ost der SBB – mit rund 60 Mitarbeitenden und ca. CHF 200 Mio. Jahresinvestitionsvolumen. Ingenieursubstanz, Führungserfahrung und ein klarer Sinn für Prioritäten.",
    proofTitle: "Was Sie bekommen",
    proofText:
      "Eine klare Einschätzung nach den ersten Wochen: wo das Portfolio steht, welche Risiken Entscheide brauchen und die nächsten konkreten Schritte. Kein Theater, keine überdimensionierte Governance.",
    strengths: [
      "Spezialist für Substanzerhalt und Erneuerung",
      "BAV-Erfahrung (Plangenehmigungsverfahren)",
      "Programm- und Portfoliogovernance",
    ],
    slideMetas: ["Zielgruppe", "Resultat", "Vorgehen"],
  },
};

/**
 * Carousel imagery — engineering / Swiss infrastructure.
 * Slide 1: user-supplied local asset (rail/landscape scene)
 * Slides 2 & 3: Unsplash, verified availability.
 */
export const slideImages: { image: string; alt: string }[] = [
  {
    image: "/image2.jpeg",
    alt: "Swiss infrastructure — engineering on site",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=85",
    alt: "Modern cable-stayed bridge — engineered infrastructure",
  },
  {
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2400&q=85",
    alt: "Railway tracks converging — precision and direction",
  },
];

export function buildSlides(copy: HomeCopy): CarouselSlide[] {
  return copy.cards.map((card, i) => ({
    title: card.title,
    text: card.text,
    image: slideImages[i].image,
    alt: slideImages[i].alt,
    meta: copy.slideMetas[i],
  }));
}
