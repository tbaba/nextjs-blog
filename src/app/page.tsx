import { Article } from "~/app/types";
import ArticleList from "~/app/components/ArticleList";
import { Heading } from "~/app/components";

async function fetchArticles(): Promise<Article[]> {
  const res = await fetch("http://localhost:3000/api/articles");
  if (!res.ok) {
    throw new Error("Failed to fetch articles from API.");
  }

  const data = await res.json();
  return data.articles as Article[];
}

export default async function Home() {
  const articles = await fetchArticles();

  return (
    <>
      <Heading as="h1" mb={4}>
        新着記事
      </Heading>
      <ArticleList articles={articles} />
    </>
  );
}
