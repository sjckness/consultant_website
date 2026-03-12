"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLanguage, useT } from "@/lib/i18n";

const copy = {
  en: {
    badge: "About",
    title: "I’m the consultant who turns strategy into daily actions.",
    subtitle:
      "I bring method, decision speed, and shared accountability. I’ve worked with product, marketing, and sales teams to reduce friction, unblock priorities, and keep a sustainable rhythm.",
    tags: ["Fractional PMO", "Workshop facilitation", "Decision design"],
    metrics: [
      { label: "B2B projects led", value: "90+" },
      { label: "Time-to-decision reduction", value: "-35%" },
      { label: "Team satisfaction", value: "4.8/5" },
    ],
    steps: [
      {
        title: "Strategy",
        text: "I align goals, numbers, and priorities so every initiative has a measurable why.",
      },
      {
        title: "Operational coaching",
        text: "I help teams decide quickly and well, with light but consistent rituals.",
      },
      {
        title: "Execution review",
        text: "Progress, risks, and next moves: what to keep, cut, or delegate.",
      },
    ],
    methodBadge: "Method",
    methodTitle: "Few meetings, maximum clarity.",
    methodText:
      "Every collaboration starts with a kickoff to define success, then deep-dive sprints and short decision sessions. Each week ends with a simple check: risks, priorities, next moves.",
    methodChip: "Weekly rhythm, zero bureaucracy",
    ctaKicker: "Let’s talk",
    ctaTitle: "Tell me your context, I’ll prepare a short plan.",
    ctaText: "20 minutes to see if I can help: goals, constraints, first decisions.",
    ctaServices: "See services",
  },
  de: {
    badge: "Über mich",
    title: "Ich bin der Consultant, der Strategie in tägliche Aktionen übersetzt.",
    subtitle:
      "Ich bringe Methode, Entscheidungstempo und gemeinsame Verantwortlichkeit. Mit Produkt-, Marketing- und Sales-Teams senke ich Reibung, kläre Prioritäten und halte ein nachhaltiges Tempo.",
    tags: ["Fractional PMO", "Workshop-Moderation", "Decision Design"],
    metrics: [
      { label: "Geführte B2B-Projekte", value: "90+" },
      { label: "Time-to-Decision Reduktion", value: "-35%" },
      { label: "Teamzufriedenheit", value: "4.8/5" },
    ],
    steps: [
      {
        title: "Strategie",
        text: "Ich richte Ziele, Zahlen und Prioritäten aus, damit jede Initiative einen messbaren Grund hat.",
      },
      {
        title: "Operatives Coaching",
        text: "Ich ermögliche Teams, schnell und gut zu entscheiden – mit leichten, konstanten Ritualen.",
      },
      {
        title: "Execution Review",
        text: "Fortschritt, Risiken, nächste Schritte: was behalten, streichen oder delegieren.",
      },
    ],
    methodBadge: "Methode",
    methodTitle: "Wenige Meetings, maximale Klarheit.",
    methodText:
      "Start mit Kickoff für Erfolgskriterien, dann Deep-Dive-Sprints und kurze Entscheidungs-Sessions. Jede Woche endet mit einem Check: Risiken, Prioritäten, nächste Moves.",
    methodChip: "Wöchentlicher Rhythmus, null Bürokratie",
    ctaKicker: "Lass uns sprechen",
    ctaTitle: "Erzähl mir den Kontext, ich bereite einen Mini-Plan vor.",
    ctaText: "20 Minuten, um zu sehen, ob ich helfen kann: Ziele, Constraints, erste Entscheidungen.",
    ctaServices: "Leistungen ansehen",
  },
};

export default function ChiSonoPage() {
  const t = useT();
  const { lang } = useLanguage();
  const data = copy[lang] ?? copy.en;

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* Hero */}
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <Reveal>
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <span className="pulse-dot" />
              {data.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {data.title}
            </h1>
            <p className="text-lg leading-8 text-slate-700">{data.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-800 shadow-sm border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center">
            <div className="absolute inset-6 rounded-[28px] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-cyan-400/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.22)]">
              <Image
                src="/profile-placeholder.svg"
                alt="portrait"
                width={840}
                height={840}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Metrics */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {data.metrics.map((m, idx) => (
          <Reveal key={m.label} delay={80 + idx * 70}>
            <div className="group rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-sm text-slate-500">{m.label}</p>
              <p className="text-2xl font-semibold text-slate-900">{m.value}</p>
              <div className="mt-2 h-1 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-600 transition-[width] duration-500 group-hover:w-full w-2/5" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Process */}
      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
        <Reveal>
          <div className="rounded-3xl bg-slate-900 text-slate-50 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
              {data.methodBadge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">{data.methodTitle}</h2>
            <p className="mt-4 text-slate-200 leading-7">{data.methodText}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 border border-white/20">
              <span className="pulse-dot" />
              {data.methodChip}
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {data.steps.map((step, idx) => (
            <Reveal key={step.title} delay={50 + idx * 80}>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {step.title}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal delay={120}>
        <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-10 shadow-[0_25px_60px_rgba(79,70,229,0.35)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">{data.ctaKicker}</p>
              <h3 className="text-3xl font-semibold leading-tight">{data.ctaTitle}</h3>
              <p className="text-white/85 leading-7">{data.ctaText}</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/contact"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:translate-y-[-2px] hover:shadow-lg"
              >
                {t("bookCall")}
              </a>
              <a
                href="/servizi"
                className="rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:translate-y-[-2px]"
              >
                {data.ctaServices}
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
