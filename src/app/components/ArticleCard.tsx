import NextLink from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "~/app/components";
import { Article } from "~/app/types";

export default function ArticleCard({ article }: { article: Article }) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "ja-JP",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Card as={"li"} minW="100%" _hover={{ boxShadow: "xl" }}>
      <NextLink href={`/articles/${article.slug}`}>
        <CardHeader>
          <Heading size="md">{article.title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{article.content.substring(0, 200)}...</Text>
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" color="gray.500">
            {formattedDate}
          </Text>
        </CardFooter>
      </NextLink>
    </Card>
  );
}
