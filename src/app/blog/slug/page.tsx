import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-xs text-slate-700">
        Pubblicato il {new Date(post.date).toLocaleDateString("it-IT")}
      </p>
      <p className="text-slate-950 whitespace-pre-line leading-relaxed">
        {post.content}
      </p>
    </article>
  );
}
