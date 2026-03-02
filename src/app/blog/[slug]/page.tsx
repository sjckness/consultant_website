import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { groq } from "next-sanity"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"

export const dynamic = "force-dynamic"

type Post = {
  title: string
  publishedAt?: string
  coverImage?: any
  content: any[]
}

const POST_QUERY = groq`
  *[_type=="post" && slug.current==$slug][0]{
    title,
    publishedAt,
    coverImage,
    content
  }
`

function formatDate(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(d)
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1600).auto("format").url()
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
            <Image
              src={src}
              alt={value?.alt || "Immagine"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
          {value?.caption ? (
            <figcaption className="mt-2 text-center text-sm text-neutral-500">{value.caption}</figcaption>
          ) : null}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-neutral-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-neutral-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-neutral-900/10 pl-5 text-neutral-700">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="my-5 leading-7 text-neutral-700">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string
      const isExternal = href?.startsWith("http")
      return (
        <a
          href={href}
          className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-600"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 list-disc space-y-2 pl-6 text-neutral-700">{children}</ul>,
    number: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6 text-neutral-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },
}

export default async function PostPage(props: {
  params: Promise<{ slug?: string }> | { slug?: string }
}) {
  const { slug } = await Promise.resolve(props.params)
  if (!slug) return notFound()

  const post: Post | null = await client.fetch(POST_QUERY, { slug })
  if (!post) return notFound()

  const cover =
    post.coverImage ? urlFor(post.coverImage).width(2000).height(1200).fit("crop").auto("format").url() : null

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/blog" className="text-sm text-neutral-600 hover:text-neutral-900">
          ← Torna al blog
        </Link>
      </div>

      {/* Cover */}
      {cover ? (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
          <Image
            src={cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
            priority
          />
        </div>
      ) : null}

      {/* Title */}
      <header className="mb-8">
        <p className="text-sm text-neutral-500">
          {post.publishedAt ? <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> : "—"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{post.title}</h1>
        <div className="mt-5 h-px w-full bg-neutral-200" />
      </header>

      {/* Content */}
      <article className="prose prose-neutral max-w-none">
        <PortableText value={post.content || []} components={portableTextComponents} />
      </article>
    </main>
  )
}