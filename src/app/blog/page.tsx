import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-1">
              <Link
                href={`/blog/${post.slug}`}
                className="text-slate-950 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-700 mb-2">
              Pubblicato il {new Date(post.date).toLocaleDateString("it-IT")}
            </p>
            <p className="text-slate-900 text-sm mb-2 leading-relaxed">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Leggi tutto →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
