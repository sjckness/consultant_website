// data/posts.ts
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
};

export const posts: Post[] = [
  {
    slug: "first-post",
    title: "First blog post",
    excerpt: "A short description of the post.",
    content: "Full post content...",
    date: "2025-11-01",
  },
  {
    slug: "second-post",
    title: "Second blog post",
    excerpt: "Description of the second post.",
    content: "More interesting content...",
    date: "2025-11-10",
  },
];
