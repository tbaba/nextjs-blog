import { Box, Flex, Heading, Button } from "./components";
import NextLink from "next/link";

export default function Header() {
  return (
    <Box as="header">
      <Flex
        bg="white"
        color="gray.700"
        px={{ base: 4 }}
        py={{ base: 2 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg" fontWeight="bold">
            <NextLink href="/">tbaba.info</NextLink>
          </Heading>
          <Button
            as={NextLink}
            href="/articles/new"
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="orange.400"
            _hover={{ bg: "orange.300" }}
          >
            記事を書く
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
