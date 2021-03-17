import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Flex, Stack } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";
import { useState } from "react";

import PostItem from "../components/PostItem";

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
      <Stack spacing={8}>
        {!data && stale ? (
          <div>loading... </div>
        ) : (
          data!.posts.posts.map((post) =>
            !post ? null : <PostItem key={post._id} post={post} />
          )
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
