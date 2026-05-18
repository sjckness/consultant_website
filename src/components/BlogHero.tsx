"use client";

import Reveal from "@/components/Reveal";
import { useT } from "@/lib/i18n";

export default function BlogHero() {
  const t = useT();
  return (
    <section className="cinematic-glow relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="page-container relative z-10">
        <Reveal>
          <span className="kicker">{t("blogBadge")}</span>
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
            {t("blogTitle")}
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-10 lead-xl" style={{ maxWidth: "72ch" }}>
            {t("blogSubtitle")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
