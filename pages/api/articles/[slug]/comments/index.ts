import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  if (req.method === "GET") {
    const articles = fs.readFileSync("articles.json", "utf8");
    const article = JSON.parse(articles).articles.find(
      (a: any) => a.slug === slug,
    );
    const comments = fs.readFileSync("comments.json", "utf8");
    const comment = JSON.parse(comments).comments.filter(
      (c: any) => c.articleId === article.id,
    );
    res.status(200).json(comment);
  }
}