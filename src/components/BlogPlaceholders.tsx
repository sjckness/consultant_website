"use client";

import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

const copy = {
  en: {
    note: "First articles in preparation. The selection below outlines the upcoming editorial line.",
    tag: "Coming soon",
    items: [
      {
        title: "How track renewal must be thought today — 5 success factors",
        excerpt:
          "What separates a renewal portfolio that delivers from one that drifts: prioritisation, possession planning, supplier discipline and risk transparency.",
      },
      {
        title: "Project leadership in complex rail environments — what really counts",
        excerpt:
          "Where senior leadership makes the difference: interface management, BAV plan-approval, and the discipline of saying no.",
      },
      {
        title: "Stakeholder management: how dialogue makes projects faster",
        excerpt:
          "Authorities, neighbours, internal units. A few proven habits to turn potential conflicts into accelerators.",
      },
    ],
  },
  de: {
    note: "Erste Beiträge in Vorbereitung. Die folgende Auswahl skizziert die geplante Linie.",
    tag: "Folgt in Kürze",
    items: [
      {
        title: "Wie Fahrbahnsanierungen heute gedacht werden müssen — 5 Erfolgsfaktoren",
        excerpt:
          "Was ein lieferndes Erneuerungsportfolio von einem driftenden unterscheidet: Priorisierung, Sperrpausenplanung, Unternehmerdisziplin und Risikotransparenz.",
      },
      {
        title: "Projektführung in komplexen Bahnumfeldern — worauf es wirklich ankommt",
        excerpt:
          "Wo senior Führung den Unterschied macht: Schnittstellenmanagement, BAV-Plangenehmigung und die Disziplin, Nein zu sagen.",
      },
      {
        title: "Stakeholdermanagement: Wie Projekte durch Dialog schneller werden",
        excerpt:
          "Behörden, Anrainer, interne Einheiten. Ein paar erprobte Gewohnheiten, die aus Konfliktpotenzial Beschleuniger machen.",
      },
    ],
  },
};

export default function BlogPlaceholders() {
  const { lang } = useLanguage();
  const data = copy[lang] ?? copy.de;

  return (
    <section className="page-container pb-32">
      <p
        className="mb-10 text-[12px] uppercase tracking-[0.22em]"
        style={{ color: "var(--ink-muted)" }}
      >
        {data.note}
      </p>
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 lg:gap-12">
        {data.items.map((item, idx) => (
          <Reveal key={item.title} delay={60 + idx * 70}>
            <article className="card flex h-full flex-col overflow-hidden">
              <div
                className="relative aspect-[16/10] w-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(123,168,217,0.18), rgba(123,168,217,0.02))",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(166,188,217,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(166,188,217,0.08) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: "var(--accent)", opacity: 0.22 }}
                />
                <span
                  className="absolute bottom-5 left-6 text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent-strong)" }}
                >
                  {data.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-9 lg:p-10">
                <h2
                  className="display-serif"
                  style={{
                    color: "var(--ink)",
                    fontSize: "clamp(1.6rem, 1.9vw, 2.1rem)",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  className="mt-5"
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "15.5px",
                    lineHeight: 1.7,
                  }}
                >
                  {item.excerpt}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
