"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { urlFor } from "@/sanity/image";
import { useLanguage } from "@/lib/i18n";

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: any;
};

const copy = {
  en: {
    noCover: "No cover",
    fallbackExcerpt: "Open the article to read more.",
    read: "Read",
    tag: "Infrastructure",
    locale: "en-GB",
  },
  de: {
    noCover: "Kein Titelbild",
    fallbackExcerpt: "Artikel öffnen, um mehr zu lesen.",
    read: "Lesen",
    tag: "Infrastruktur",
    locale: "de-CH",
  },
};

function formatDate(iso: string | undefined, locale: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function BlogList({ posts }: { posts: PostCard[] }) {
  const { lang } = useLanguage();
  const c = copy[lang] ?? copy.de;

  return (
    <section className="page-container pb-32">
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 lg:gap-12">
        {posts.map((p, idx) => {
          const img = p.coverImage
            ? urlFor(p.coverImage)
                .width(1600)
                .height(1000)
                .fit("crop")
                .auto("format")
                .url()
            : null;

          return (
            <Reveal key={p._id} delay={60 + idx * 60}>
              <Link
                href={`/blog/${p.slug}`}
                className="card group flex h-full flex-col overflow-hidden"
              >
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden"
                  style={{ background: "var(--bg-deep)" }}
                >
                  {img ? (
                    <>
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-[900ms] group-hover:scale-[1.045]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={false}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(13,14,16,0.15) 60%, rgba(13,14,16,0.65) 100%)",
                        }}
                      />
                    </>
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.22em]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {c.noCover}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-9 lg:p-10">
                  <div
                    className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {p.publishedAt ? (
                      <time className="tabular" dateTime={p.publishedAt}>
                        {formatDate(p.publishedAt, c.locale)}
                      </time>
                    ) : null}
                    <span style={{ color: "var(--rule-strong)" }}>·</span>
                    <span style={{ color: "var(--accent-strong)" }}>{c.tag}</span>
                  </div>

                  <h2
                    className="mt-5 line-clamp-3 display-serif"
                    style={{
                      color: "var(--ink)",
                      fontSize: "clamp(1.6rem, 1.9vw, 2.1rem)",
                    }}
                  >
                    {p.title}
                  </h2>

                  <p
                    className="mt-5 line-clamp-3"
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "15.5px",
                      lineHeight: 1.7,
                    }}
                  >
                    {p.excerpt ?? c.fallbackExcerpt}
                  </p>

                  <div
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--accent-strong)" }}
                  >
                    {c.read}
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
