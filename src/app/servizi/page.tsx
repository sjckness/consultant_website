"use client";

import Reveal from "@/components/Reveal";
import { useT, useLanguage } from "@/lib/i18n";

const servicesDefault = [
  {
    title: "Strategy Sprint",
    desc: "2-week sprint to lock goals, priorities, and risks. Clear, immediately actionable outputs.",
    bullets: ["90-min discovery", "Problem framing canvas", "Priority map + next 30 days"],
  },
  {
    title: "Execution Roadmap",
    desc: "Plan with milestones, owners, dependencies, and metrics. Lightweight governance, no endless gantt.",
    bullets: ["Milestone plan", "Dependencies & risks", "KPI dashboard draft"],
  },
  {
    title: "Coaching & Accountability",
    desc: "Short rituals to remove blockers and decide fast. Async support when needed.",
    bullets: ["Weekly check-ins", "Issue triage", "Asynchronous support"],
  },
];

const stepsDefault = [
  { label: "01", title: "Kickoff", text: "Obiettivi, scope, vincoli in 45 minuti." },
  { label: "02", title: "Deep-dive", text: "Mappo stato attuale, raccolgo insight, accordiamo success criteria." },
  { label: "03", title: "Roadmap", text: "Presento piano con owner, tempi, rischi e metriche." },
  { label: "04", title: "Follow-through", text: "Check settimanali per monitorare e correggere velocemente." },
];

const copy = {
  en: {
    tags: ["B2B & product teams", "Remote-friendly", "Numbers first"],
    services: servicesDefault.map((s) => ({
      title: s.title,
      desc: "2-week sprint for goals, priorities and risks. Clear, actionable outputs.",
      bullets: ["90-min discovery", "Problem framing canvas", "Priority map + next 30 days"],
    })),
    steps: [
      { label: "01", title: "Kickoff", text: "Goals, scope, constraints in 45 minutes." },
      { label: "02", title: "Deep-dive", text: "Map current state, gather insights, agree success criteria." },
      { label: "03", title: "Roadmap", text: "Plan with owners, timing, risks and metrics." },
      { label: "04", title: "Follow-through", text: "Weekly checks to stay on course and adjust fast." },
    ],
  },
  de: {
    tags: ["B2B & Product-Teams", "Remote-first", "Zahlen zuerst"],
    services: [
      {
        title: "Strategy Sprint",
        desc: "2 Wochen für Ziele, Prioritäten und Risiken. Klare Outputs, sofort umsetzbar.",
        bullets: ["Discovery 90 Minuten", "Problem-Framing-Canvas", "Prioritäten-Map + nächste 30 Tage"],
      },
      {
        title: "Execution Roadmap",
        desc: "Plan mit Meilensteinen, Ownern, Abhängigkeiten und Metriken. Schlanke Governance.",
        bullets: ["Milestone-Plan", "Risiken & Abhängigkeiten", "KPI-Dashboard Draft"],
      },
      {
        title: "Coaching & Accountability",
        desc: "Kurze Rituale, um Blocker zu entfernen und schnell zu entscheiden. Async-Support inklusive.",
        bullets: ["Wöchentliche Check-ins", "Issue-Triage", "Asynchroner Support"],
      },
    ],
    steps: [
      { label: "01", title: "Kickoff", text: "Ziele, Scope, Constraints in 45 Minuten." },
      { label: "02", title: "Deep-dive", text: "Ist-Stand mappen, Insights sammeln, Success Criteria vereinbaren." },
      { label: "03", title: "Roadmap", text: "Plan mit Ownern, Timing, Risiken und Metriken präsentieren." },
      { label: "04", title: "Follow-through", text: "Wöchentliche Checks, um Kurs zu halten und schnell nachzujustieren." },
    ],
  },
};

export default function ServiziPage() {
  const t = useT();
  const { lang } = useLanguage();
  const data = copy[lang] ?? copy.en;
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
      {/* Hero */}
      <Reveal>
        <header className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
            {t("servicesBadge")}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {t("servicesTitle")}
          </h1>
          <p className="max-w-3xl text-lg text-slate-700 leading-7">
            {t("servicesSubtitle")}
          </p>
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
        </header>
      </Reveal>

      {/* Services grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.services.map((service, idx) => (
          <Reveal key={service.title} delay={60 + idx * 70}>
            <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100">
                <div className="absolute inset-4 rounded-xl border border-dashed border-slate-200 bg-white/70 backdrop-blur-sm flex items-center justify-center text-sm text-slate-500">
                  Focus area
                </div>
              </div>
              <div className="px-5 pb-5 space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
                <p className="text-sm leading-6 text-slate-700">{service.desc}</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Process */}
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-[0_15px_45px_rgba(15,23,42,0.06)]">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Process</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Come lavoreremo</h2>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t("bookCall")} →
            </a>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {data.steps.map((step, idx) => (
            <Reveal key={step.title} delay={60 + idx * 80}>
              <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {step.label}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm leading-6 text-slate-700">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal delay={80}>
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-neutral-50 p-6 sm:p-8 shadow-[0_25px_60px_rgba(79,70,229,0.35)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">Next step</p>
              <h3 className="text-3xl font-semibold leading-tight">Parliamone, preparo un mini piano entro 24h.</h3>
              <p className="text-sm leading-6 text-white/85">
                Dammi contesto, timeline e vincoli. Ti restituisco un perimetro chiaro e le prime decisioni da prendere.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/contact"
                className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:translate-y-[-2px] hover:shadow-lg"
              >
                {t("bookCall")}
              </a>
              <a
                href="/blog"
                className="rounded-full border border-white/60 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:translate-y-[-2px]"
              >
                Vedi note & case
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
