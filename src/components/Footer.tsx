"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage, useT } from "@/lib/i18n";

const copy = {
  en: {
    tagline:
      "Strategic advisory and operational leadership for complex infrastructure portfolios — with a focus on rail and multi-disciplinary projects.",
    browse: "Browse",
    contact: "Contact",
    social: "Social",
    available: "Available Mon–Fri",
    response: "Replies within 24h",
    rights: "All rights reserved",
  },
  de: {
    tagline:
      "Strategische Beratung und operative Führung für komplexe Infrastrukturportfolios – mit Fokus auf Bahninfrastruktur und multidisziplinäre Vorhaben.",
    browse: "Navigation",
    contact: "Kontakt",
    social: "Social",
    available: "Erreichbar Mo–Fr",
    response: "Antwort innerhalb 24 h",
    rights: "Alle Rechte vorbehalten",
  },
};

const CONTACT_EMAIL = "kontakt@steffensinfraport.ch";
const CONTACT_PHONE = "+41 00 000 00 00";
const LINKEDIN_URL = "https://www.linkedin.com/in/gustavo-steffens-47059324";

export default function Footer() {
  const t = useT();
  const { lang } = useLanguage();
  const c = copy[lang] ?? copy.de;
  return (
    <footer
      className="relative mt-24 w-full"
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid var(--rule)",
        color: "var(--ink-soft)",
      }}
    >
      <div className="page-container grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        {/* BRAND */}
        <div className="space-y-5 md:col-span-5">
          <Image
            src="/image1.png"
            alt="Steffens Infraport Consulting"
            width={520}
            height={156}
            sizes="(max-width: 768px) 18rem, 24rem"
            className="h-20 w-auto md:h-24"
          />
          <p
            className="max-w-md text-[15px] leading-7"
            style={{ color: "var(--ink-muted)" }}
          >
            {c.tagline}
          </p>
        </div>

        {/* BROWSE */}
        <div className="md:col-span-3">
          <h3
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--ink-muted)" }}
          >
            {c.browse}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/about", label: t("navAbout") },
              { href: "/services", label: t("navServices") },
              { href: "/references", label: t("navExperience") },
              { href: "/industries", label: t("navFor") },
              { href: "/blog", label: t("navBlog") },
              { href: "/contact", label: t("navContact") },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors"
                  style={{ color: "var(--ink-soft)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-strong)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--ink-soft)")
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:col-span-3">
          <h3
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--ink-muted)" }}
          >
            {c.contact}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 transition-colors"
                style={{ color: "var(--ink-soft)" }}
              >
                <Mail size={15} style={{ color: "var(--accent)" }} />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors"
                style={{ color: "var(--ink-soft)" }}
              >
                <Phone size={15} style={{ color: "var(--accent)" }} />
                {CONTACT_PHONE}
              </a>
            </li>
            <li style={{ color: "var(--ink-muted)" }}>{c.available}</li>
            <li style={{ color: "var(--ink-muted)" }}>{c.response}</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="md:col-span-1">
          <h3
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--ink-muted)" }}
          >
            {c.social}
          </h3>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition"
            style={{
              border: "1px solid var(--rule)",
              color: "var(--ink-soft)",
            }}
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      <div
        className="border-t py-5"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="page-container flex flex-col items-center justify-between gap-2 text-xs md:flex-row">
          <span style={{ color: "var(--ink-muted)" }}>
            © {new Date().getFullYear()} Steffens Infraport Consulting — {c.rights}
          </span>
          <span className="flex items-center gap-3">
            <span
              className="tabular tracking-[0.22em] uppercase text-[10px]"
              style={{ color: "var(--ink-faint)" }}
            >
              Engineered in Switzerland
            </span>
            <Link
              href="/admin"
              className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:text-[var(--accent-strong)] hover:border-[var(--accent)]"
              style={{ borderColor: "var(--rule)", color: "var(--ink-soft)" }}
            >
              Admin
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
