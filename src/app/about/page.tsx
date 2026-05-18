"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLanguage, useT } from "@/lib/i18n";

const copy = {
  en: {
    badge: "About me",
    title: "Engineering depth, leadership and a clear sense of priorities.",
    subtitle:
      "I am a civil engineer with more than 20 years of international experience. At SBB I led demanding project portfolios — most recently as Head of Track Region East, with around 60 staff and an annual investment volume of approximately CHF 200 mio.",
    body: "As an IPMA-certified Programme Manager (Level A), MBA holder and leader with specialist knowledge in railway construction, I bring the broad and deep project know-how that is essential for integrated, successful portfolio steering.",
    tags: ["Civil engineer", "IPMA Level A", "MBA", "Rail specialist"],
    metrics: [
      { label: "International experience", value: "20+ yrs" },
      { label: "Annual investment portfolio (SBB)", value: "CHF 200 mio." },
      { label: "Team led", value: "60 staff" },
    ],
    pillarsTitle: "How I work",
    pillars: [
      {
        title: "Background",
        text: "Civil engineering studies, international assignments, then SBB leadership roles in track and infrastructure renewal.",
      },
      {
        title: "Leadership & stakeholders",
        text: "Comfortable with authorities (BAV), neighbours, internal units and contractors; a calm hand in critical situations.",
      },
      {
        title: "Languages & soft skills",
        text: "German, Italian, Spanish, English. Structured, decisive, focused on people and on outcomes.",
      },
    ],
    methodBadge: "Approach",
    methodTitle: "Take the portfolio in hand. Bring the projects home.",
    methodText:
      "Every engagement starts with a sober assessment of where the portfolio stands. From there, structure, decisions and execution — with the discipline rail infrastructure demands and the stakeholder fluency the public sector needs.",
    methodChip: "Senior responsibility, hands-on delivery",
    ctaKicker: "Let's talk",
    ctaTitle: "Tell me your context, I'll prepare a short assessment.",
    ctaText:
      "A 30-minute call to scope goals, constraints and the first decisions to take.",
    ctaServices: "See services",
    linkedin: "LinkedIn profile",
  },
  de: {
    badge: "Über mich",
    title:
      "Ingenieurssubstanz, Führungserfahrung und ein klarer Sinn für Prioritäten.",
    subtitle:
      "Ich bin Bauingenieur mit über 20 Jahren internationaler Berufserfahrung und habe bei der SBB anspruchsvolle Projektportfolien verantwortet – zuletzt als Leiter Fahrbahn Region Ost mit rund 60 Mitarbeitenden und einem jährlichen Investitionsvolumen von etwa CHF 200 Mio.",
    body: "Als IPMA-zertifizierter Programmmanager (Level A), MBA und Führungskraft mit Spezialwissen im Bahnbau bringe ich fundierte und breite Kenntnisse im Projektgeschäft – die Schlüssel für eine integrale und erfolgreiche Portfoliosteuerung.",
    tags: ["Bauingenieur", "IPMA Level A", "MBA", "Bahnbau-Spezialist"],
    metrics: [
      { label: "Internationale Berufserfahrung", value: "20+ J." },
      { label: "Jährliches Investitionsvolumen (SBB)", value: "CHF 200 Mio." },
      { label: "Geführtes Team", value: "60 Mitarb." },
    ],
    pillarsTitle: "So arbeite ich",
    pillars: [
      {
        title: "Beruflicher Hintergrund",
        text: "Bauingenieurstudium, internationale Einsätze, danach Führungsrollen bei der SBB in Fahrbahn und Infrastrukturerneuerung.",
      },
      {
        title: "Führung & Stakeholder",
        text: "Erfahren im Umgang mit Behörden (BAV), Anrainern, internen Einheiten und Unternehmern – ruhige Hand in kritischen Situationen.",
      },
      {
        title: "Sprachen & Soft Skills",
        text: "Deutsch, Italienisch, Spanisch, Englisch. Strukturiert, entscheidungsstark, mit Fokus auf Menschen und Ergebnis.",
      },
    ],
    methodBadge: "Ansatz",
    methodTitle: "Portfolio in die Hand nehmen. Projekte sicher ins Ziel bringen.",
    methodText:
      "Jeder Auftrag beginnt mit einer nüchternen Standortbestimmung des Portfolios. Daraus folgen Struktur, Entscheidungen und Umsetzung – mit der Disziplin, die Bahninfrastruktur fordert, und der Stakeholderkompetenz, die der öffentliche Sektor braucht.",
    methodChip: "Senior Verantwortung, hands-on Umsetzung",
    ctaKicker: "Lassen Sie uns sprechen",
    ctaTitle: "Schildern Sie mir den Kontext, ich bereite eine kurze Einschätzung vor.",
    ctaText:
      "30 Minuten, um Ziele, Constraints und die ersten Entscheide zu klären.",
    ctaServices: "Leistungen ansehen",
    linkedin: "LinkedIn-Profil",
  },
};

export default function AboutPage() {
  const t = useT();
  const { lang } = useLanguage();
  const data = copy[lang] ?? copy.de;

  return (
    <>
      {/* HERO */}
      <section className="cinematic-glow relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="page-container relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5 lg:col-start-2 xl:col-start-2">
              <Reveal>
                <span className="kicker">{data.badge}</span>
              </Reveal>

              <Reveal delay={80}>
                <h1
                  className="mt-8 display-serif"
                  style={{
                    color: "var(--ink)",
                    fontSize: "clamp(2.35rem, 4.5vw, 4.5rem)",
                  }}
                >
                  {data.title}
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-10 lead-xl" style={{ maxWidth: "60ch" }}>
                  {data.subtitle}
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-6 lead-xl" style={{ maxWidth: "60ch" }}>
                  {data.body}
                </p>
              </Reveal>

              <Reveal delay={260}>
                <div className="mt-10 flex flex-wrap gap-2.5">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-4 py-2 text-[13px] font-medium"
                      style={{
                        border: "1px solid var(--rule)",
                        color: "var(--ink-soft)",
                        background: "var(--bg-glass)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-8">
                  <a
                    href="https://www.linkedin.com/in/gustavo-steffens-47059324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Linkedin size={16} />
                    {data.linkedin}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="mx-auto w-full lg:mx-0 lg:max-w-[547px] lg:ml-auto">
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-14 -z-10 rounded-[44px] blur-3xl"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(95,160,230,0.22), transparent 70%)",
                    }}
                  />
                  <div
                    className="relative overflow-hidden rounded-3xl"
                    style={{
                      border: "1px solid var(--rule-strong)",
                      boxShadow:
                        "0 50px 110px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.04) inset",
                      aspectRatio: "4 / 5",
                    }}
                  >
                    <Image
                      src="/image3.jpeg"
                      alt="Gustavo Steffens — CEO, Steffens Infraport Consulting"
                      width={1200}
                      height={1500}
                      sizes="(max-width: 1024px) 90vw, 720px"
                      className="h-full w-full object-cover"
                      priority
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(13,14,16,0) 60%, rgba(13,14,16,0.55) 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="page-container pb-24">
        <div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-3"
          style={{
            border: "1px solid var(--rule)",
            background: "var(--rule)",
          }}
        >
          {data.metrics.map((m, idx) => (
            <Reveal key={m.label} delay={80 + idx * 70}>
              <div
                className="flex flex-col gap-3 px-9 py-9 lg:px-12"
                style={{ background: "var(--bg-elevated)" }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {m.label}
                </span>
                <span
                  className="display-serif tabular text-4xl md:text-5xl"
                  style={{ color: "var(--ink)" }}
                >
                  {m.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* METHOD + PILLARS — restructured: section header on top, content full-width below */}
      <section className="page-container pb-28">
        <Reveal>
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <span className="kicker">{data.methodBadge}</span>
              <h2
                className="mt-6 display-serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                  maxWidth: "20ch",
                }}
              >
                {data.methodTitle}
              </h2>
            </div>
            <div className="md:col-span-5">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs"
                style={{
                  border: "1px solid var(--rule)",
                  background: "var(--bg-glass)",
                  color: "var(--ink-soft)",
                }}
              >
                <span className="pulse-dot" />
                {data.methodChip}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p
            className="mt-10 lead-xl"
            style={{ maxWidth: "78ch" }}
          >
            {data.methodText}
          </p>
        </Reveal>

        {/* Pillars — 3 columns, balanced */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 lg:gap-10">
          {data.pillars.map((step, idx) => (
            <Reveal key={step.title} delay={80 + idx * 80}>
              <article className="card flex h-full flex-col p-9 lg:p-10">
                <span
                  className="display-serif tabular text-3xl md:text-4xl"
                  style={{ color: "var(--accent)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-7 text-xl font-semibold tracking-tight md:text-[22px]"
                  style={{ color: "var(--ink)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-4"
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "16px",
                    lineHeight: 1.75,
                  }}
                >
                  {step.text}
                </p>
              </article>
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
                <span className="kicker">{data.ctaKicker}</span>
                <h3
                  className="display-serif"
                  style={{
                    color: "var(--ink)",
                    fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  }}
                >
                  {data.ctaTitle}
                </h3>
                <p
                  className="body-lg"
                  style={{ maxWidth: "60ch" }}
                >
                  {data.ctaText}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/contact" className="btn-primary">
                  {t("bookCall")} <span aria-hidden>→</span>
                </a>
                <a href="/services" className="btn-secondary">
                  {data.ctaServices}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
