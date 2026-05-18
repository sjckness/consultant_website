"use client";

import {
  Briefcase,
  ClipboardList,
  Users,
  Leaf,
  UsersRound,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useT, useLanguage } from "@/lib/i18n";

const copy = {
  en: {
    intro:
      "I advise and support owners and operators across the full lifecycle of complex infrastructure portfolios — from strategy down to delivery on the construction site.",
    tags: ["Rail infrastructure", "Civil engineering", "Public clients"],
    services: [
      {
        icon: "briefcase",
        title: "Programme & Portfolio Management",
        desc: "Build the structure that lets a portfolio be steered: strategic setup, financial control, and risk management at portfolio level.",
        bullets: [
          "Strategic advisory on programme / portfolio setup",
          "Financial steering and portfolio monitoring",
          "Risk management at portfolio level",
        ],
      },
      {
        icon: "clipboard",
        title: "Project Management",
        desc: "Senior support across all SIA 112 phases of demanding construction projects, with deep know-how of the Swiss rail and approval landscape.",
        bullets: [
          "Advisory across all project phases (SIA 112)",
          "Plan-approval procedures (incl. BAV experience)",
          "Agile project management for infrastructure",
          "Crisis management & turnaround of complex projects",
          "Railway engineering, VöV, BöB-VöB, interface management",
        ],
      },
      {
        icon: "users",
        title: "Stakeholder Management & Communication",
        desc: "Conflict prevention and clear communication with authorities, internal units, neighbours and the public — the backbone of every approval-driven project.",
        bullets: [
          "Conflict prevention with authorities, internal units, neighbours",
          "Communication on critical and public-facing projects",
        ],
      },
      {
        icon: "leaf",
        title: "Digital & Sustainable Infrastructure",
        desc: "Make decisions on the right basis: lifecycle thinking, BIM and sustainability anchored in rail-construction projects.",
        bullets: [
          "LCM-based decision making (mono-disciplinary, civil works, track)",
          "BIM rollout & process advisory",
          "Embedding sustainability in rail-construction projects",
        ],
      },
      {
        icon: "team",
        title: "Team Development",
        desc: "Build teams that decide and deliver. Conflict resolution, the right composition, and change management as part of continuous organisational growth.",
        bullets: [
          "Conflict management in team building",
          "Effectiveness through the right team composition",
          "Change management (e.g. BIM rollout, process change)",
        ],
      },
      {
        icon: "shield",
        title: "Client Representation & Project Steering",
        desc: "Take the owner's seat: strategic advisory plus operational steering of time, cost and quality across large project portfolios.",
        bullets: [
          "Strategic advisory and operational support",
          "Plan-approval procedures (incl. BAV experience)",
          "Time, cost and quality steering of large portfolios",
        ],
      },
    ],
    process: [
      { label: "01", title: "Assess", text: "Take a sober look at the portfolio: where it stands, where the risks are." },
      { label: "02", title: "Structure", text: "Define governance, decision points and the right cadence." },
      { label: "03", title: "Decide", text: "Bring the open questions to a clean decision — fast." },
      { label: "04", title: "Deliver", text: "Stay on the project until it's safely on track." },
    ],
    processTitle: "How we work together",
    nextStep: "Next step",
    ctaTitle: "Let's talk — I'll prepare a short read on your portfolio.",
    ctaText: "Send me your context, timeline and constraints. You'll get back a clear scope and the first decisions to take.",
    ctaSecondary: "See knowledge & posts",
  },
  de: {
    intro:
      "Ich berate und unterstütze Bauherren und Betreiber über den gesamten Lebenszyklus komplexer Infrastrukturportfolios – von der Strategie bis zur Umsetzung auf der Baustelle.",
    tags: ["Bahninfrastruktur", "Ingenieurbau", "Öffentliche Bauherren"],
    services: [
      {
        icon: "briefcase",
        title: "Programm- und Portfoliomanagement",
        desc: "Die Struktur schaffen, in der ein Portfolio überhaupt steuerbar wird: strategischer Aufbau, finanzielle Steuerung und Risikomanagement auf Portfoliostufe.",
        bullets: [
          "Strategische Beratung für den strukturellen Aufbau eines Programms oder Portfolios",
          "Finanzielle Steuerung sowie Überwachung des Projektportfolios",
          "Risikomanagement auf Portfoliostufe",
        ],
      },
      {
        icon: "clipboard",
        title: "Projektmanagement",
        desc: "Senior-Begleitung über alle SIA-112-Phasen anspruchsvoller Bauvorhaben, mit fundiertem Verständnis der Schweizer Bahn- und Bewilligungslandschaft.",
        bullets: [
          "Beratung für komplexe Bauvorhaben über alle Projektphasen (SIA 112)",
          "Beratung für Plangenehmigungsverfahren (inkl. BAV-Erfahrung)",
          "Anwendung von agilem Projektmanagement in Infrastrukturprojekten",
          "Krisenmanagement & Neuausrichtung von komplexen Projekten",
          "Kenntnisse in Eisenbahntechnik, VöV-Vorgaben, BöB-VöB & Schnittstellenmanagement",
        ],
      },
      {
        icon: "users",
        title: "Stakeholdermanagement & Kommunikation",
        desc: "Konfliktprävention und klare Kommunikation mit Behörden, internen Einheiten, Anrainern und Öffentlichkeit – das Rückgrat jedes bewilligungspflichtigen Vorhabens.",
        bullets: [
          "Konfliktprävention mit Behörden, internen Einheiten, Anrainern",
          "Kommunikation bei kritischen Projekten und öffentlichen Vorhaben",
        ],
      },
      {
        icon: "leaf",
        title: "Digitale & nachhaltige Infrastrukturprojekte",
        desc: "Entscheidungen auf der richtigen Grundlage: Lifecycle-Betrachtung, BIM und Nachhaltigkeit in Bahnbauprojekten verankern.",
        bullets: [
          "LCM-Betrachtung bei Massnahmenentscheiden (mono-disziplinär, Ingenieurbau, Fahrbahn)",
          "BIM-Einführung & Prozessberatung",
          "Nachhaltigkeit in Bahnbauprojekten verankern",
        ],
      },
      {
        icon: "team",
        title: "Teamentwicklung",
        desc: "Teams aufbauen, die entscheiden und liefern. Konfliktmanagement, richtige Zusammensetzung und Changemanagement als Teil der kontinuierlichen Unternehmensentwicklung.",
        bullets: [
          "Konfliktmanagement in der Teambildung",
          "Effizienzsteigerung durch geeignete Teamzusammensetzung",
          "Changemanagement (z.B. BIM- oder Prozesseinführung)",
        ],
      },
      {
        icon: "shield",
        title: "Bauherrenvertretung & Projektsteuerung",
        desc: "Den Stuhl des Bauherrn einnehmen: strategische Beratung und operative Steuerung von Termin, Kosten und Qualität über grosse Projektportfolios.",
        bullets: [
          "Strategische Beratung und operative Begleitung",
          "Plangenehmigungsverfahren (inkl. BAV-Erfahrung)",
          "Termin-, Kosten- und Qualitätssteuerung grosser Projektportfolios",
        ],
      },
    ],
    process: [
      { label: "01", title: "Standortbestimmung", text: "Nüchtern hinschauen: wo das Portfolio steht, wo die Risiken liegen." },
      { label: "02", title: "Struktur", text: "Governance, Entscheidungspunkte und Taktung definieren." },
      { label: "03", title: "Entscheiden", text: "Offene Fragen in saubere Entscheide überführen – zügig." },
      { label: "04", title: "Umsetzen", text: "Dranbleiben, bis das Projekt sicher in der Spur ist." },
    ],
    processTitle: "How we work together",
    nextStep: "Nächster Schritt",
    ctaTitle: "Sprechen wir – ich bereite eine kurze Einschätzung Ihres Portfolios vor.",
    ctaText: "Schicken Sie mir Kontext, Zeitachse und Constraints. Sie erhalten einen klaren Scope und die ersten zu treffenden Entscheidungen.",
    ctaSecondary: "Wissen & Beiträge ansehen",
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  briefcase: Briefcase,
  clipboard: ClipboardList,
  users: Users,
  leaf: Leaf,
  team: UsersRound,
  shield: ShieldCheck,
};

export default function ServicesPage() {
  const t = useT();
  const { lang } = useLanguage();
  const data = copy[lang] ?? copy.de;

  return (
    <>
      {/* HERO */}
      <section className="cinematic-glow relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="page-container relative z-10">
          <Reveal>
            <span className="kicker">{t("servicesBadge")}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-6 display-serif"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(2.15rem, 4.15vw, 4.15rem)",
                maxWidth: "22ch",
              }}
            >
              {t("servicesTitle")}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-10 lead-xl" style={{ maxWidth: "68ch" }}>
              {data.intro}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-2 text-[13px] font-medium"
                  style={{
                    border: "1px solid var(--rule)",
                    background: "var(--bg-glass)",
                    color: "var(--ink-soft)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="page-container pb-24">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {data.services.map((service, idx) => {
            const Icon = iconMap[service.icon] ?? Briefcase;
            return (
              <Reveal key={service.title} delay={60 + idx * 70}>
                <article className="card flex h-full flex-col p-9 lg:p-10">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent-strong)",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      className="tabular text-[12px] font-semibold"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2
                    className="mt-7 text-[20px] font-semibold tracking-tight md:text-[22px]"
                    style={{ color: "var(--ink)" }}
                  >
                    {service.title}
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "15px",
                      lineHeight: 1.75,
                    }}
                  >
                    {service.desc}
                  </p>
                  <ul
                    className="mt-6 space-y-2.5"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "14.5px",
                    }}
                  >
                    {service.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-[11px] h-[3px] w-3.5 flex-shrink-0"
                          style={{ background: "var(--accent)" }}
                        />
                        <span style={{ lineHeight: 1.65 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="page-container pb-24">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="kicker">Process</span>
              <h2
                className="mt-6 display-serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(2rem, 3.4vw, 3rem)",
                  maxWidth: "20ch",
                }}
              >
                {data.processTitle}
              </h2>
            </div>
            <a href="/contact" className="btn-primary">
              {t("bookCall")} <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>

        <div
          className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}
        >
          {data.process.map((step, idx) => (
            <Reveal key={step.title} delay={60 + idx * 70}>
              <div
                className="flex h-full flex-col gap-5 p-9 lg:p-10"
                style={{ background: "var(--bg-elevated)" }}
              >
                <span
                  className="display-serif tabular text-4xl md:text-5xl"
                  style={{ color: "var(--accent)" }}
                >
                  {step.label}
                </span>
                <h3
                  className="text-[19px] font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                >
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-container pb-32">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{
              border: "1px solid var(--rule-strong)",
              background:
                "linear-gradient(135deg, rgba(123,168,217,0.10), rgba(123,168,217,0.02))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "var(--accent)", opacity: 0.18 }}
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <div className="max-w-3xl space-y-4">
                <span className="kicker">{data.nextStep}</span>
                <h3
                  className="display-serif"
                  style={{
                    color: "var(--ink)",
                    fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  }}
                >
                  {data.ctaTitle}
                </h3>
                <p className="body-lg" style={{ maxWidth: "62ch" }}>
                  {data.ctaText}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/contact" className="btn-primary">
                  {t("bookCall")} <span aria-hidden>→</span>
                </a>
                <a href="/blog" className="btn-secondary">
                  {data.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
