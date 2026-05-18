"use client";

import {
  Building2,
  Network,
  Compass,
  HardHat,
  Train,
  Construction,
  RefreshCcw,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

const copy = {
  en: {
    badge: "Industries & clients",
    title: "Broad versatility, focused specialisation.",
    intro:
      "I work with organisations that own, operate or build infrastructure — bringing structure where complexity, public scrutiny and engineering depth come together.",
    audiencesTitle: "Target clients",
    audiences: [
      { icon: "building", title: "Public clients", text: "Rail companies, ASTRA, cantons and municipalities running multi-year construction programmes." },
      { icon: "network", title: "Operators & infrastructure owners", text: "Asset-heavy organisations balancing operational availability with substance preservation and renewal." },
      { icon: "compass", title: "Planning offices", text: "Engineering firms with coordination needs across disciplines, contractors and approval bodies." },
      { icon: "hardhat", title: "General contractors", text: "GUs facing leadership or project-management bottlenecks on demanding infrastructure tenders." },
    ],
    industriesTitle: "Industries",
    industriesSubtitle: "Where I'm at home — both in engineering and in governance.",
    industries: [
      { icon: "train", title: "Rail infrastructure", text: "Stations, track, tunnels, bridges. Renewal portfolios under operations, BAV plan-approval, multi-disciplinary interfaces." },
      { icon: "construction", title: "Transport infrastructure", text: "Roads and broader transport works that share the engineering, approval and stakeholder DNA of rail projects." },
      { icon: "refresh", title: "Renewal & expansion projects", text: "Substance preservation and capacity expansion under operational constraints — the bread and butter of infrastructure leadership." },
    ],
    notFitTitle: "When I'm not the right fit",
    notFit: [
      "Pure design/engineering production without owner-side leadership scope",
      "Engagements without a clear decision maker or sponsor",
      "Mandates without measurable goals or a defined time budget",
    ],
  },
  de: {
    badge: "Branchen & Zielgruppen",
    title: "Breite Einsatzfähigkeit und klare Spezialisierung.",
    intro:
      "Ich arbeite mit Organisationen, die Infrastruktur besitzen, betreiben oder bauen – und bringe Struktur dorthin, wo Komplexität, öffentliche Aufmerksamkeit und Ingenieurssubstanz zusammentreffen.",
    audiencesTitle: "Zielgruppen",
    audiences: [
      { icon: "building", title: "Öffentliche Bauherren", text: "Bahnunternehmen, ASTRA, Kantone und Gemeinden mit mehrjährigen Bauprogrammen." },
      { icon: "network", title: "Betreiber & Infrastruktureigentümer", text: "Asset-intensive Organisationen im Spannungsfeld zwischen Verfügbarkeit, Substanzerhalt und Erneuerung." },
      { icon: "compass", title: "Planungsbüros", text: "Ingenieurbüros mit Koordinationsbedarf über Disziplinen, Unternehmer und Bewilligungsstellen hinweg." },
      { icon: "hardhat", title: "Generalunternehmer", text: "GUs mit Führungs- oder PM-Engpässen bei anspruchsvollen Infrastrukturausschreibungen." },
    ],
    industriesTitle: "Branchen",
    industriesSubtitle: "Hier bin ich zu Hause – im Ingenieurwesen wie in der Governance.",
    industries: [
      { icon: "train", title: "Bahninfrastruktur", text: "Bahnhöfe, Fahrbahn, Tunnel, Brücken. Erneuerungsportfolios unter Betrieb, BAV-Plangenehmigung, multidisziplinäre Schnittstellen." },
      { icon: "construction", title: "Verkehrsinfrastruktur allgemein", text: "Strasse und weitere Verkehrsbauten – mit der gleichen Ingenieur-, Bewilligungs- und Stakeholder-DNA wie Bahnprojekte." },
      { icon: "refresh", title: "Erneuerungs- & Ausbauprojekte", text: "Substanzerhalt und Kapazitätsausbau unter Betriebsbedingungen – das Kerngeschäft der Infrastrukturführung." },
    ],
    notFitTitle: "Wann ich nicht der richtige Partner bin",
    notFit: [
      "Reine Planungs-/Ausführungsleistungen ohne bauherrenseitigen Führungsanteil",
      "Mandate ohne klaren Entscheider oder Sponsor",
      "Aufträge ohne messbare Ziele oder definiertes Zeitbudget",
    ],
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  building: Building2,
  network: Network,
  compass: Compass,
  hardhat: HardHat,
  train: Train,
  construction: Construction,
  refresh: RefreshCcw,
};

export default function IndustriesPage() {
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

      {/* AUDIENCES */}
      <section className="page-container pb-24">
        <Reveal>
          <span className="kicker">{data.audiencesTitle}</span>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {data.audiences.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Building2;
            return (
              <Reveal key={item.title} delay={70 + idx * 70}>
                <article className="card flex h-full flex-col p-9 lg:p-10">
                  <div
                    className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent-strong)",
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h2
                    className="text-[19px] font-semibold tracking-tight"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="page-container pb-24">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="kicker">{data.industriesTitle}</span>
              <h3
                className="mt-6 display-serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(2rem, 3.4vw, 3rem)",
                  maxWidth: "22ch",
                }}
              >
                {data.industriesSubtitle}
              </h3>
            </div>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-10">
          {data.industries.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Train;
            return (
              <Reveal key={item.title} delay={80 + idx * 70}>
                <article className="card flex h-full flex-col p-9 lg:p-10">
                  <div
                    className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{
                      background: "var(--bg-deep)",
                      border: "1px solid var(--rule)",
                      color: "var(--accent-strong)",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4
                    className="text-[21px] font-semibold tracking-tight"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="mt-4"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "15.5px",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* NOT FIT */}
      <section className="page-container pb-32">
        <Reveal>
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{
              border: "1px solid var(--rule-strong)",
              background: "var(--bg-elevated)",
            }}
          >
            <span className="kicker">Honest scope</span>
            <h3
              className="mt-6 display-serif"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(1.7rem, 2.6vw, 2.2rem)",
                maxWidth: "22ch",
              }}
            >
              {data.notFitTitle}
            </h3>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {data.notFit.map((item, idx) => (
                <Reveal key={item} delay={80 + idx * 60}>
                  <li
                    className="flex items-start gap-4"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "15.5px",
                      lineHeight: 1.75,
                    }}
                  >
                    <span
                      className="mt-3 h-px w-7 flex-shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
