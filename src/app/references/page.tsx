"use client";

import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

const copy = {
  en: {
    badge: "References",
    title: "Projects steered, infrastructure delivered.",
    intro:
      "A selection of representative projects from more than 20 years across rail and civil infrastructure. Volumes, roles and scope shown to give a feel for the breadth of engagements.",
    figuresTitle: "In numbers",
    figuresSubtitle: "What two decades of leadership in rail infrastructure look like.",
    figures: [
      { value: "> CHF 1.2 bn", label: "Total project volume" },
      { value: "> 200", label: "Projects accompanied" },
      { value: "> 15 yrs", label: "Rail infrastructure experience" },
      { value: "60", label: "Largest team led (SBB)" },
    ],
    references: [
      {
        badge: "Track renewal portfolio",
        title: "BZU23 — Track Region East",
        role: "Programme lead, SBB",
        scope: "Multi-year renewal programme",
        text: "Steering of a portfolio of track-renewal projects across Region East: prioritisation, possession planning with operations, supplier coordination and tight cost/schedule control.",
      },
      {
        badge: "Track Region East",
        title: "Annual investment portfolio",
        role: "Head of Track, SBB",
        scope: "≈ CHF 200 mio. / year, 60 staff",
        text: "Overall responsibility for the annual investment volume of Track Region East: strategy, budgeting, risk management and delivery oversight across dozens of parallel projects.",
      },
      {
        badge: "Civil works",
        title: "Bridge & engineering structures renewal",
        role: "Project portfolio lead",
        scope: "Multi-disciplinary",
        text: "Coordination of substance-preservation projects on engineering structures with operational availability constraints — interface management between civil, rail technology and operations.",
      },
      {
        badge: "Plan-approval",
        title: "BAV-relevant infrastructure project",
        role: "Owner-side advisory",
        scope: "Approval-driven",
        text: "Support on a plan-approval procedure with the Swiss Federal Office of Transport (BAV): documentation, stakeholder dialogue and conflict resolution with neighbours and authorities.",
      },
      {
        badge: "Process & digital",
        title: "BIM rollout in rail construction",
        role: "Programme advisor",
        scope: "Process & change",
        text: "Anchoring of BIM methodology in a rail-construction unit: process design, change management with project teams and integration with existing planning standards.",
      },
    ],
    refsNote:
      "The references above are kept anonymised and indicative. Project-specific details available on request, within the limits of the respective confidentiality agreements.",
  },
  de: {
    badge: "Referenzen",
    title: "Projekte gesteuert, Infrastruktur realisiert.",
    intro:
      "Eine Auswahl repräsentativer Projekte aus über 20 Jahren in Bahn- und Bauinfrastruktur. Volumen, Rolle und Umfang sind angegeben, um die Bandbreite der Mandate sichtbar zu machen.",
    figuresTitle: "In Zahlen",
    figuresSubtitle: "Wie zwei Jahrzehnte Führung in der Bahninfrastruktur aussehen.",
    figures: [
      { value: "> CHF 1.2 Mrd.", label: "Projektvolumen gesamt" },
      { value: "> 200", label: "Begleitete Projekte" },
      { value: "> 15 J.", label: "Erfahrung Bahninfrastruktur" },
      { value: "60", label: "Grösstes geführtes Team (SBB)" },
    ],
    references: [
      {
        badge: "Fahrbahn-Erneuerungsportfolio",
        title: "BZU23 — Fahrbahn Region Ost",
        role: "Programmleitung, SBB",
        scope: "Mehrjähriges Erneuerungsprogramm",
        text: "Steuerung eines Portfolios von Fahrbahnerneuerungsprojekten in der Region Ost: Priorisierung, Sperrpausenplanung mit dem Betrieb, Unternehmerkoordination sowie enge Termin- und Kostenkontrolle.",
      },
      {
        badge: "Fahrbahn Region Ost",
        title: "Jährliches Investitionsportfolio",
        role: "Leiter Fahrbahn, SBB",
        scope: "≈ CHF 200 Mio./Jahr, 60 Mitarbeitende",
        text: "Gesamtverantwortung für das jährliche Investitionsvolumen Fahrbahn Region Ost: Strategie, Budget, Risikomanagement und Umsetzungsaufsicht über Dutzende paralleler Projekte.",
      },
      {
        badge: "Ingenieurbau",
        title: "Erneuerung Brücken & Kunstbauten",
        role: "Portfolioverantwortung",
        scope: "Multidisziplinär",
        text: "Koordination von Substanzerhalt-Projekten an Kunstbauten unter Berücksichtigung der betrieblichen Verfügbarkeit – Schnittstellenmanagement zwischen Tiefbau, Bahntechnik und Betrieb.",
      },
      {
        badge: "Plangenehmigung",
        title: "BAV-relevantes Infrastrukturprojekt",
        role: "Bauherrenvertretung",
        scope: "Bewilligungsgetrieben",
        text: "Begleitung eines Plangenehmigungsverfahrens mit dem Bundesamt für Verkehr (BAV): Dokumentation, Stakeholderdialog und Konfliktklärung mit Anrainern und Behörden.",
      },
      {
        badge: "Prozesse & Digitalisierung",
        title: "BIM-Einführung im Bahnbau",
        role: "Programmberatung",
        scope: "Prozess & Change",
        text: "Verankerung der BIM-Methodik in einer Bahnbau-Einheit: Prozessgestaltung, Changemanagement mit Projektteams und Integration in bestehende Planungsstandards.",
      },
    ],
    refsNote:
      "Die obigen Referenzen sind anonymisiert und indikativ dargestellt. Projektspezifische Details auf Anfrage, im Rahmen der jeweiligen Vertraulichkeitsvereinbarungen.",
  },
};

export default function ReferencesPage() {
  const { lang } = useLanguage();
  const data = copy[lang] ?? copy.de;

  return (
    <>
      {/* HERO */}
      <section className="cinematic-glow relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="page-container relative z-10">
          <Reveal>
            <span className="kicker">{data.badge}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-6 display-serif"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(2.15rem, 4.15vw, 4.15rem)",
                maxWidth: "20ch",
              }}
            >
              {data.title}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-10 lead-xl" style={{ maxWidth: "70ch" }}>
              {data.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FIGURES */}
      <section className="page-container pb-24">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="kicker">{data.figuresTitle}</span>
              <h2
                className="mt-6 display-serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(2rem, 3.4vw, 3rem)",
                  maxWidth: "22ch",
                }}
              >
                {data.figuresSubtitle}
              </h2>
            </div>
          </div>
        </Reveal>
        <div
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4"
          style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}
        >
          {data.figures.map((f, idx) => (
            <Reveal key={f.label} delay={60 + idx * 70}>
              <div
                className="flex flex-col gap-4 p-9 lg:p-11"
                style={{ background: "var(--bg-elevated)" }}
              >
                <span
                  className="display-serif tabular text-4xl md:text-[44px] lg:text-5xl"
                  style={{ color: "var(--ink)" }}
                >
                  {f.value}
                </span>
                <span
                  className="text-[12px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {f.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REFERENCE PROJECTS */}
      <section className="page-container pb-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">
          {data.references.map((item, idx) => (
            <Reveal key={item.title} delay={60 + idx * 80}>
              <article className="card flex h-full flex-col overflow-hidden">
                <div
                  className="relative h-52 w-full overflow-hidden lg:h-60"
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
                        "linear-gradient(to right, rgba(166,188,217,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(166,188,217,0.10) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
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
                    {item.badge}
                  </span>
                  <span
                    className="absolute bottom-5 right-6 tabular text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-9 lg:p-10">
                  <h2
                    className="text-[21px] font-semibold tracking-tight md:text-[23px]"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="mt-3 text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {item.role} · {item.scope}
                  </p>
                  <p
                    className="mt-5"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "15.5px",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p
            className="mt-14 max-w-3xl text-[15px] leading-[1.7]"
            style={{ color: "var(--ink-muted)" }}
          >
            {data.refsNote}
          </p>
        </Reveal>
      </section>
    </>
  );
}
