import Image from "next/image";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { client } from "@/sanity/client";
import { HIDDEN_POST_SLUGS } from "@/sanity/hidden";
import { urlFor } from "@/sanity/image";
import { BlogBackLink, BlogPublishedDate } from "@/components/BlogPostMeta";

// Static export needs at least one path. While the CMS has no posts we emit a
// dummy slug; PostPage finds no post for it and renders the 404 page.
const EMPTY_SLUG = "_none";

export async function generateStaticParams() {
  const all: string[] = await client.fetch(
    groq`*[_type=="post" && defined(slug.current)].slug.current`
  );
  const slugs = all.filter((slug) => !HIDDEN_POST_SLUGS.includes(slug));
  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: EMPTY_SLUG }];
}

type Post = {
  title: string;
  publishedAt?: string;
  coverImage?: any;
  content: any[];
};

const POST_QUERY = groq`
  *[_type=="post" && slug.current==$slug][0]{
    title,
    publishedAt,
    coverImage,
    content
  }
`;

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(2000).auto("format").url();
      return (
        <figure className="my-14">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--rule)" }}
          >
            <Image
              src={src}
              alt={value?.alt || "Image"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
          {value?.caption ? (
            <figcaption
              className="mt-4 text-center text-[14px]"
              style={{ color: "var(--ink-muted)" }}
            >
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2
        className="mt-16 scroll-mt-24 display-serif"
        style={{
          color: "var(--ink)",
          fontSize: "clamp(1.9rem, 2.6vw, 2.6rem)",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-12 scroll-mt-24 text-[24px] font-semibold tracking-tight md:text-[26px]"
        style={{ color: "var(--ink)" }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-12 pl-7 text-[20px] italic leading-[1.65]"
        style={{
          borderLeft: "2px solid var(--accent)",
          color: "var(--ink-soft)",
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p
        className="my-7"
        style={{
          color: "var(--ink-soft)",
          fontSize: "18.5px",
          lineHeight: 1.75,
        }}
      >
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string;
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          className="underline underline-offset-4 transition"
          style={{
            color: "var(--accent-strong)",
            textDecorationColor: "var(--accent-deep)",
          }}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="my-8 list-disc space-y-3 pl-7"
        style={{
          color: "var(--ink-soft)",
          fontSize: "18.5px",
          lineHeight: 1.75,
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="my-8 list-decimal space-y-3 pl-7"
        style={{
          color: "var(--ink-soft)",
          fontSize: "18.5px",
          lineHeight: 1.75,
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export default async function PostPage(props: {
  params: Promise<{ slug?: string }> | { slug?: string };
}) {
  const { slug } = await Promise.resolve(props.params);
  if (!slug) return notFound();

  const post: Post | null = await client.fetch(POST_QUERY, { slug });
  if (!post) return notFound();

  const cover = post.coverImage
    ? urlFor(post.coverImage).width(2600).height(1400).fit("crop").auto("format").url()
    : null;

  return (
    <article
      className="mx-auto pt-16 pb-32"
      style={{
        width: "100%",
        maxWidth: "1180px",
        paddingInline: "clamp(1.5rem, 3vw, 4rem)",
      }}
    >
      <div className="mb-10">
        <BlogBackLink />
      </div>

      {cover ? (
        <div
          className="relative mb-14 aspect-[16/9] overflow-hidden rounded-3xl"
          style={{
            border: "1px solid var(--rule)",
            background: "var(--bg-deep)",
          }}
        >
          <Image
            src={cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1180px"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,14,16,0) 60%, rgba(13,14,16,0.55) 100%)",
            }}
          />
        </div>
      ) : null}

      {/* Header — wide */}
      <header className="mb-14" style={{ maxWidth: "1000px" }}>
        <p
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "var(--ink-muted)" }}
        >
          <BlogPublishedDate iso={post.publishedAt} />
        </p>
        <h1
          className="mt-5 display-serif"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(2rem, 3.8vw, 3.65rem)",
          }}
        >
          {post.title}
        </h1>
        <div
          className="mt-10 h-px w-full"
          style={{ background: "var(--rule)" }}
        />
      </header>

      {/* Body — generous reading column without feeling cramped */}
      <div style={{ maxWidth: "820px" }}>
        <PortableText
          value={post.content || []}
          components={portableTextComponents}
        />
      </div>
    </article>
  );
}
