import NextLink from "next/link";
import { Button } from "~/app/components";
import { notFound } from "next/navigation";
import { Article, Comment } from "~/app/types";
import { Suspense } from "react";

const getArticle = async (slug: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3000/api/articles/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch the article: " + res.statusText);
  }

  const data = await res.json();
  return data as Article;
};

const getComments = async (slug: string): Promise<Comment[]> => {
  const res = await fetch(
    `http://localhost:3000/api/articles/${slug}/comments`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comments: " + res.statusText);
  }

  const data = await res.json();
  return data as Comment[];
};

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  const commentPromise = getComments(params.slug);

  return (
    <div>
      <section className="mb-3">
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </section>
      <section className="mb-3">
        <h2>コメント</h2>
        <Suspense fallback={<p>読み込み中...</p>}>
          {/* @ts-ignore */}
          <Comments commentPromise={commentPromise} />
        </Suspense>
      </section>
      <Button as={NextLink} href={`/`}>
        戻る
      </Button>
    </div>
  );
}

async function Comments({
  commentPromise,
}: {
  commentPromise: Promise<Comment[]>;
}) {
  const comments = await commentPromise;

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
    </>
  );
}
