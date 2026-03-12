"use client";

import Reveal from "@/components/Reveal";

const highlights = [
  {
    title: "Rilancio funnel B2B",
    text: "Coordinamento tra marketing e prodotto per ridurre il ciclo di vendita: -22% lead time decisionale, +18% conversione demo → contratto.",
    badge: "SaaS mid-market",
  },
  {
    title: "PMO su lancio prodotto",
    text: "Impostazione rituali, roadmap trimestrale e risk log: ship del MVP in 9 settimane, zero scivolamenti critici.",
    badge: "Manufacturing tech",
  },
  {
    title: "Turnaround team marketing",
    text: "Reset of priorities, content calendar and paid governance: +32% ROAS in 60 days.",
    badge: "E-commerce",
  },
];

const timeline = [
  { year: "2025", title: "Fractional PMO", text: "Portfolio of 4 cross-functional squads, OKR standard and monthly cadence with C-level." },
  { year: "2024", title: "Growth advisory", text: "Pricing, client onboarding and Sales → CS handoff with documented playbook." },
  { year: "2023", title: "Workshop & coaching", text: "40+ sessions on decision design, prioritisation and effective retros." },
];

const quotes = [
  {
    name: "Head of Product",
    text: "“In three weeks we took firm decisions on what to cut and what to ship. The team now always knows the why.”",
  },
  {
    name: "COO",
    text: "“Simple rituals, no endless slides. Risk of blockers dropped because every Friday we close open loops.”",
  },
];

export default function EsperienzePage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
      {/* Hero */}
      <Reveal>
        <header className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
            Esperienze
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Progetti seguiti, impatti misurabili.
          </h1>
          <p className="text-lg leading-8 text-slate-700 max-w-3xl">
            I make strategy, operations and metrics converge. Every engagement has a clear goal, a defined time window and a tight review cadence.
          </p>
        </header>
      </Reveal>

      {/* Highlights */}
      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item, idx) => (
          <Reveal key={item.title} delay={60 + idx * 80}>
            <article className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {item.badge}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Timeline */}
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 md:p-8 shadow-[0_15px_45px_rgba(15,23,42,0.06)]">
        <Reveal>
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Percorso
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">Cosa ho costruito negli ultimi anni</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Decision design • PMO • Go-to-market
            </span>
          </div>
        </Reveal>
        <div className="space-y-4">
          {timeline.map((item, idx) => (
            <Reveal key={item.year} delay={80 + idx * 90}>
              <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm hover:shadow-md transition">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-700">
                  {item.year}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                  <p className="text-sm leading-6 text-slate-700">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section className="grid gap-4 md:grid-cols-2">
        {quotes.map((q, idx) => (
          <Reveal key={q.name} delay={70 + idx * 70}>
            <figure className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
              <p className="text-slate-800 italic leading-7">{q.text}</p>
              <figcaption className="mt-3 text-sm font-semibold text-slate-900">
                {q.name}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
