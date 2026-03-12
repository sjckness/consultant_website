"use client";

import Reveal from "@/components/Reveal";

const fit = [
  {
    title: "Team prodotto digitali",
    text: "You need a light PMO to align roadmap, marketing, and sales without heavy process.",
    tag: "SaaS / App",
  },
  {
    title: "Scale-up B2B",
    text: "You want clear priorities, fast decision rituals, and an external owner who keeps the pace.",
    tag: "Series A-B",
  },
  {
    title: "Leadership marketing & growth",
    text: "You want steering on campaigns, content, and funnel, with numbers founders can act on.",
    tag: "Demand gen",
  },
];

const notFit = [
  "Projects without internal ownership or a reachable decision maker",
  "Purely operational requests (e.g., ongoing ads management, bulk copy production)",
  "Engagements without measurable goals or a defined time budget",
];

const ways = [
  {
    title: "Sprint di allineamento",
    text: "2–3 weeks to clean priorities, map risks, and set a plan with owners and metrics.",
  },
  {
    title: "Fractional PMO",
    text: "Weekly rituals, retros and decision meetings to keep focus and unlock quickly.",
  },
  {
    title: "Advisory / coaching",
    text: "Bi-weekly check-ins for product/marketing leads with roadmap and funnel review.",
  },
];

export default function DestinatariPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 py-16 space-y-12">
      {/* Hero */}
      <Reveal>
        <header className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
            Per chi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            I work with teams that want to decide and deliver faster.
          </h1>
          <p className="text-lg leading-8 text-slate-700 max-w-3xl">
            No bureaucracy, lots of clarity: objectives, priorities, cadence, and constant checks. If you need someone to call decisions when needed, you’re in the right place.
          </p>
        </header>
      </Reveal>

      {/* Fit cards */}
      <section className="grid gap-6 md:grid-cols-3">
        {fit.map((item, idx) => (
          <Reveal key={item.title} delay={70 + idx * 80}>
            <article className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {item.tag}
              </span>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Ways of working */}
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 md:p-8 shadow-[0_15px_45px_rgba(15,23,42,0.06)]">
        <Reveal>
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Come lavoriamo
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">Flexible formats, same clear cadence</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Decisioni • Focus • Ritmo
            </span>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {ways.map((item, idx) => (
            <Reveal key={item.title} delay={80 + idx * 70}>
              <div className="rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm hover:shadow-md transition">
                <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Not fit */}
      <section className="rounded-3xl border border-rose-100 bg-rose-50/70 p-6 md:p-8 shadow-[0_10px_30px_rgba(244,63,94,0.12)]">
        <Reveal>
          <h3 className="text-xl font-semibold text-rose-900">When I’m not the right fit</h3>
        </Reveal>
        <div className="mt-3 space-y-2">
          {notFit.map((item, idx) => (
            <Reveal key={item} delay={80 + idx * 60}>
              <div className="flex items-start gap-3 text-sm text-rose-900">
                <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                <p>{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
