"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "@/lib/i18n";

const links = [
  { href: "/", key: "navHome" },
  { href: "/about", key: "navAbout" },
  { href: "/services", key: "navServices" },
  { href: "/references", key: "navExperience" },
  { href: "/industries", key: "navFor" },
  { href: "/blog", key: "navBlog" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const t = useT();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setProgress(pct);
      setScrolled(scrollTop > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_40px_rgba(0,0,0,0.12)]" : ""
      }`}
      style={{
        background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: "1px solid var(--nav-rule)",
      }}
    >
      <div
        className="flex w-full items-center justify-between gap-8"
        style={{
          paddingInline: "clamp(1.5rem, 3.5vw, 4.5rem)",
          paddingBlock: "1.25rem",
        }}
      >
        <Link
          href="/"
          aria-label="Steffens Infraport Consulting — Home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logo.svg"
            alt="Steffens Infraport Consulting"
            width={590}
            height={140}
            priority
            unoptimized
            className="h-[60px] w-auto md:h-[72px] lg:h-[80px]"
          />
        </Link>

        <nav
          className="hidden items-center gap-9 font-medium md:flex xl:gap-14"
          style={{
            fontSize: "17px",
            color: "var(--nav-ink-soft)",
          }}
        >
          {links.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className="nav-link transition"
                style={{
                  color: active ? "var(--nav-ink)" : "var(--nav-ink-soft)",
                  fontWeight: active ? 600 : 500,
                  letterSpacing: "0.005em",
                }}
              >
                {t(item.key as any)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full px-6 py-3 text-[15px] font-semibold transition md:inline-flex hover:brightness-110"
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              boxShadow: "0 6px 18px rgba(95,160,230,0.32)",
            }}
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
            className="rounded-full p-2 transition md:hidden"
            style={{ color: "var(--nav-ink)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          className="md:hidden px-6 py-4"
          style={{
            background: "#ffffff",
            borderTop: "1px solid var(--nav-rule)",
          }}
        >
          <nav className="flex flex-col gap-1">
            {links.map((item) => {
              const active = isActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-lg px-3 py-3 text-base font-medium transition"
                  style={{
                    color: active ? "var(--nav-ink)" : "var(--nav-ink-soft)",
                    background: active ? "rgba(0,0,0,0.04)" : "transparent",
                  }}
                >
                  {t(item.key as any)}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={close}
              className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold"
              style={{ background: "var(--nav-ink)", color: "#ffffff" }}
            >
              {t("navContact")}
            </Link>
            <div className="pt-3">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      ) : null}

      <div className="h-px w-full" style={{ background: "var(--nav-rule)" }}>
        <div
          aria-hidden
          style={{
            width: `${progress}%`,
            background: "var(--nav-ink)",
          }}
          className="h-px transition-[width] duration-150 ease-out"
        />
      </div>
    </header>
  );
}
