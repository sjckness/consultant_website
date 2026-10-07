import { groq } from "next-sanity";
import { client } from "@/sanity/client";
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
    posts = await client.fetch(POSTS_QUERY);
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
