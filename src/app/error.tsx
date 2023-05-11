"use client";

import { useEffect } from "react";
import { Heading, Button } from "./components";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Heading as="h1" size="lg">
        エラーが発生しました
      </Heading>
      <Button onClick={reset}>リロード</Button>
    </div>
  );
}
