import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Reveal from "@/components/Reveal";
import BlogHero from "@/components/BlogHero";

export const dynamic = "force-dynamic"

type PostCard = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  coverImage?: any
}

const POSTS_QUERY = groq`
  *[_type=="post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage
  }
`;

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default async function BlogPage() {
  const posts: PostCard[] = await client.fetch(POSTS_QUERY);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-10">
      {/* Hero */}
      <BlogHero />

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm">
          No articles published yet.
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const img =
              p.coverImage
                ? urlFor(p.coverImage).width(1200).height(800).fit("crop").auto("format").url()
                : null;

            return (
              <Reveal key={p._id}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Cover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {img ? (
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                        No cover
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {p.publishedAt ? <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time> : null}
                      <span className="text-slate-300">•</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">Consulting</span>
                    </div>

                    <h2 className="mt-3 line-clamp-2 text-lg font-semibold tracking-tight text-slate-900">
                      {p.title}
                    </h2>

                    {p.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700">{p.excerpt}</p>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Apri l’articolo per leggere i dettagli.
                      </p>
                    )}

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                      Leggi
                      <span className="transition group-hover:translate-x-0.5">→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </section>
      )}
    </main>
  );
}
