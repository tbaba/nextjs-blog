"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "~/app/components";

export default function CreateArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to create an article");
      return;
    }

    router.push("/");
    startTransition(() => router.refresh());
  };

  return (
    <div>
      <Heading mb={4}>記事を作成する</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <FormLabel>本文</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button
            type="submit"
            isLoading={loading || isPending}
            color="white"
            bg="orange.400"
            mt={4}
          >
            作成
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
