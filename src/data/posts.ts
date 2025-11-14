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
    slug: "primo-articolo",
    title: "Primo articolo del blog",
    excerpt: "Una breve descrizione dell'articolo.",
    content: "Contenuto completo dell'articolo...",
    date: "2025-11-01",
  },
  {
    slug: "secondo-articolo",
    title: "Secondo articolo del blog",
    excerpt: "Descrizione del secondo articolo.",
    content: "Altro contenuto interessante...",
    date: "2025-11-10",
  },
];
