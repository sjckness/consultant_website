import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { HIDDEN_POST_SLUGS } from "@/sanity/hidden";
import BlogHero from "@/components/BlogHero";
import BlogPlaceholders from "@/components/BlogPlaceholders";
import BlogList, { type PostCard } from "@/components/BlogList";

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

export default async function BlogPage() {
  let posts: PostCard[] = [];
  try {
    const all: PostCard[] = await client.fetch(POSTS_QUERY);
    posts = all.filter((p) => !HIDDEN_POST_SLUGS.includes(p.slug));
  } catch {
    posts = [];
  }

  return (
    <>
      <BlogHero />
      {posts.length === 0 ? <BlogPlaceholders /> : <BlogList posts={posts} />}
    </>
  );
}
