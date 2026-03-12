"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "@/lib/i18n";

const links = [
  { href: "/chi_sono", key: "navAbout" },
  { href: "/servizi", key: "navServices" },
  { href: "/esperienze", key: "navExperience" },
  { href: "/destinatari", key: "navFor" },
  { href: "/blog", key: "navBlog" },
];

export default function Navbar() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  // Track scroll for progress + shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setProgress(pct);
      setScrolled(scrollTop > 6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          Il Mio Servizio
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link transition hover:text-blue-600"
            >
              {t(item.key as any)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex"
          >
            {t("bookCall")}
          </Link>

          <div className="hidden md:inline-flex">
            <LanguageSwitcher />
          </div>

          <button
            onClick={toggle}
            aria-label={open ? t("navMenuClose") : t("navMenuOpen")}
            aria-expanded={open}
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-3 shadow-lg">
          <nav className="flex flex-col gap-2">
            {links.map((item) => (
              <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition hover:bg-slate-100"
            >
              {t(item.key as any)}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={close}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            {t("navContact")}
          </Link>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      ) : null}

      {/* Scroll progress bar */}
      <div className="h-0.5 w-full bg-slate-100">
        <div
          aria-hidden
          style={{ width: `${progress}%` }}
          className="h-full bg-blue-600 transition-[width] duration-150 ease-out"
        />
      </div>
    </header>
  );
}
