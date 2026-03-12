"use client";

import ClaimRotator from "@/components/ClaimRotator";
import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";

const homeCopy = {
  en: {
    stats: ["Projects delivered", "Avg response time", "Satisfaction"],
    cards: [
      {
        title: "Who it's for",
        text: "Teams or companies that want structured guidance instead of improvised effort.",
      },
      {
        title: "What you get",
        text: "Clarity, priorities, a concrete plan, and support focused on delivery.",
      },
      {
        title: "How it works",
        text: "We talk, analyse your situation, and define a tailored path together.",
      },
    ],
    whyTitle: "Why choose me?",
    whyText:
      "Real experience, case studies, a concrete way of working, zero fluff. I focus on taking clients from A to B.",
    proofTitle: "Mini proof / clear promise",
    proofText:
      "If we don't see clear results within a few weeks, I'll say so and we stop—no hard feelings, no wasted time.",
    strengths: ["Proof over theory", "Decisions over slides", "Rituals that stick"],
  },
  de: {
    stats: ["Abgeschlossene Projekte", "Ø Antwortzeit", "Zufriedenheit"],
    cards: [
      {
        title: "Für wen",
        text: "Teams oder Firmen, die klare Führung statt Improvisation wollen.",
      },
      {
        title: "Was du bekommst",
        text: "Klarheit, Prioritäten, einen konkreten Plan und Support mit Fokus auf Delivery.",
      },
      {
        title: "Wie es läuft",
        text: "Wir sprechen, analysieren deine Situation und definieren gemeinsam den Fahrplan.",
      },
    ],
    whyTitle: "Warum mit mir?",
    whyText:
      "Erfahrung, Cases, ein greifbarer Arbeitsstil, kein Blabla. Ziel: gemeinsam von A nach B kommen.",
    proofTitle: "Proof / klare Zusage",
    proofText:
      "Wenn wir nach wenigen Wochen keine klaren Ergebnisse sehen, sage ich es offen und wir stoppen – ohne Zeit zu verlieren.",
    strengths: ["Proof statt Theorie", "Entscheidungen statt Slides", "Rituale, die bleiben"],
  },
};

export default function HomePage() {
  const t = useT();
  const { lang } = useLanguage();
  const copy = homeCopy[lang] ?? homeCopy.en;
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative w-full overflow-hidden pt-32 pb-20 text-center bg-gradient-to-b from-white to-slate-100">
        <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-20 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-1 w-[140%] -translate-x-1/2 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.16),_transparent_45%)] animate-gradient-slide" />

        <div className="w-full max-w-6xl mx-auto px-6 relative">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <span className="pulse-dot" />
              {t("heroBadge")}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              {t("heroTitle")}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto space-y-2">
              <p>{t("heroSubtitle")}</p>
              <p className="text-base text-slate-500">
                Focus di oggi: <ClaimRotator />
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="/contact"
                className="animated-gradient px-10 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("bookCall")} →
              </a>

              <a
                href="/servizi"
                className="px-10 py-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { label: copy.stats[0], value: "120+" },
              { label: copy.stats[1], value: "24h" },
              { label: copy.stats[2], value: "4.9/5" },
            ].map((item, idx) => (
              <Reveal key={item.label} delay={120 + idx * 80}>
                <div className="group rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                  <div className="mt-2 h-1 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600 transition-[width] duration-500 group-hover:w-full w-1/3" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* SEZIONE: PER CHI È */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {copy.cards.map((card, idx) => (
          <Reveal key={card.title} delay={100 + idx * 80}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-left hover:shadow-lg hover:-translate-y-1 transition">
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                {card.title}
              </h2>
              <p className="text-sm text-slate-600">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* SEZIONE: PERCHÉ TE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
            <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {copy.whyTitle}
                </h2>
                <p className="text-sm md:text-base text-slate-200">
                  {copy.whyText}
                </p>
                <ul className="text-sm text-slate-200 space-y-1">
                  {copy.strengths.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 text-sm text-slate-300 border border-slate-700 rounded-2xl p-5 bg-slate-800/60">
                <p className="mb-3 font-semibold text-slate-100">
                  {copy.proofTitle}
                </p>
                <p>
                  {copy.proofText}
                </p>
              </div>
            </div>
        </Reveal>
      </section>
    </main>
  );
}
