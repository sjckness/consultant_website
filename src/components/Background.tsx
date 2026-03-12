"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const backgrounds: { test: (path: string) => boolean; src: string }[] = [
  {
    test: (p) => p === "/",
    src: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1800&q=80",
  },
  {
    test: (p) => p.startsWith("/servizi"),
    src: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1800&q=80",
  },
  {
    test: (p) => p.startsWith("/chi_sono"),
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80",
  },
  {
    test: (p) => p.startsWith("/blog"),
    src: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1800&q=80",
  },
  {
    test: (p) => p.startsWith("/contact"),
    src: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1800&q=80",
  },
  {
    test: () => true,
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function Background() {
  const path = usePathname() || "/";
  const match = backgrounds.find((b) => b.test(path))!;
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Image
        src={match.src}
        alt="Background texture"
        fill
        sizes="100vw"
        className="object-cover opacity-35 blur-[1.5px] scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/90 to-white/95" />
    </div>
  );
}
