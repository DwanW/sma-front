import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, stale }] = usePostsQuery({ variables });

  if (!stale && !data) {
    return <div>query failed</div>;
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>Social News Aggregation</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <Stack spacing={8}>
        {!data && stale ? (
          <div>loading... </div>
        ) : (
          data!.posts.posts.map((post) => (
            <Box key={post._id} p={5} shadow="md" borderWidth="1px">
              <Text fontSize="xs" colorScheme="whiteAlpha">
                posted by {post.creator.username}
              </Text>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))
        )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={stale}
            m="auto"
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
