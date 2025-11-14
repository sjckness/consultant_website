"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/chi-sono", label: "Chi sono" },
    { href: "/servizi", label: "Servizi" },
    { href: "/esperienze", label: "Esperienze" },
    { href: "/destinatari", label: "Per chi" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contatti" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-slate-900 tracking-tight"
        >
          Il Mio Servizio
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-700 hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-slate-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-4 space-y-4">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-slate-800 text-base font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
