"use client";

import ClaimRotator from "@/components/ClaimRotator";
import HomeCarousel from "@/components/HomeCarousel";
import Reveal from "@/components/Reveal";
import { buildSlides, homeCopy } from "@/components/home/homeData";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { lang } = useLanguage();
  const copy = homeCopy[lang] ?? homeCopy.de;
  const slides = buildSlides(copy);

  return (
    <>
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="relative cinematic-glow overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="page-container relative z-10 text-center">
          <Reveal>
            <p
              className="inline-flex items-center gap-3 rounded-full border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{
                borderColor: "var(--rule-strong)",
                background: "var(--bg-glass)",
                color: "var(--ink-soft)",
              }}
            >
              <span className="pulse-dot" />
              {copy.kicker}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className="mx-auto mt-10 display-serif"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(2.5rem, 6vw, 6.3rem)",
                maxWidth: "20ch",
              }}
            >
              {copy.heroTitle}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p
              className="mx-auto mt-10 lead-xl"
              style={{ maxWidth: "62ch" }}
            >
              {copy.heroLead}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p
              className="mx-auto mt-7 flex flex-wrap items-baseline justify-center gap-x-3 text-[12px] uppercase tracking-[0.24em]"
              style={{ color: "var(--ink-muted)" }}
            >
              {copy.heroFocus}
              <span
                className="normal-case tracking-normal text-lg md:text-xl"
                style={{ color: "var(--accent-strong)" }}
              >
                <ClaimRotator />
              </span>
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <a href="/contact" className="btn-primary">
                {copy.ctaPrimary} <span aria-hidden>→</span>
              </a>
              <a href="/services" className="btn-secondary">
                {copy.ctaSecondary}
              </a>
            </div>
          </Reveal>

          {/* Stats — three-column strip beneath CTAs */}
          <Reveal delay={340}>
            <ul
              className="mx-auto mt-20 grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-3"
              style={{
                background: "var(--rule)",
                border: "1px solid var(--rule)",
                maxWidth: "1320px",
              }}
            >
              {copy.stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-3 px-8 py-9"
                  style={{ background: "var(--bg-elevated)" }}
                >
                  <span
                    className="display-serif tabular text-4xl md:text-5xl lg:text-6xl"
                    style={{ color: "var(--ink)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[12px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── CINEMATIC CAROUSEL ──────────────────── */}
      <HomeCarousel slides={slides} />

      {/* ─────────────────── WHO / WHAT / HOW ─────────────────── */}
      <section className="page-container py-28 md:py-36">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="kicker">Engagement</span>
              <h2
                className="mt-6 display-serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(2.4rem, 4.2vw, 4rem)",
                }}
              >
                Three positions, one engineered approach.
              </h2>
            </div>
            <p
              className="max-w-md"
              style={{
                color: "var(--ink-muted)",
                fontSize: "17px",
                lineHeight: 1.65,
              }}
            >
              From the audience we serve, through the outcomes you receive, to
              the method we follow on the site.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3 lg:gap-10">
          {copy.cards.map((card, idx) => (
            <Reveal key={card.title} delay={80 + idx * 80}>
              <article className="card flex h-full flex-col p-9 lg:p-10">
                <span
                  className="tabular text-sm font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-6 display-serif"
                  style={{
                    color: "var(--ink)",
                    fontSize: "clamp(1.6rem, 1.8vw, 2rem)",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-5"
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "16px",
                    lineHeight: 1.75,
                  }}
                >
                  {card.text}
                </p>
                <span
                  className="mt-auto pt-10 text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {copy.slideMetas[idx]}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ────────────────────── WHY / PROOF ────────────────────── */}
      <section className="page-container pb-36">
        {/* Header — full-width, calm */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="kicker">On the record</span>
              <h2
                className="mt-6 display-serif"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(2.4rem, 4.2vw, 4rem)",
                  maxWidth: "18ch",
                }}
              >
                {copy.whyTitle}
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Body + strengths — wide single column for premium reading rhythm */}
        <div className="mt-14">
          <Reveal delay={80}>
            <p className="lead-xl" style={{ maxWidth: "72ch" }}>
              {copy.whyText}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <ul className="mt-14 grid gap-5 sm:grid-cols-3 lg:gap-7">
              {copy.strengths.map((s) => (
                <li
                  key={s}
                  className="card p-7 text-[15.5px] leading-[1.7]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* What I commit to — full-width band, room for headline + CTAs */}
        <Reveal delay={200}>
          <div
            className="relative mt-16 overflow-hidden rounded-3xl p-10 md:p-14 lg:p-16"
            style={{
              border: "1px solid var(--rule-strong)",
              background:
                "linear-gradient(135deg, rgba(95,160,230,0.12), rgba(95,160,230,0.02))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
              style={{ background: "var(--accent)", opacity: 0.18 }}
            />
            <div className="relative grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="kicker">{copy.proofTitle}</span>
                <p
                  className="mt-6 text-[19px] leading-[1.65] md:text-[22px] md:leading-[1.55]"
                  style={{ color: "var(--ink)", maxWidth: "62ch" }}
                >
                  {copy.proofText}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
                <a href="/contact" className="btn-primary">
                  {copy.ctaPrimary} <span aria-hidden>→</span>
                </a>
                <a href="/services" className="btn-secondary">
                  {copy.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
