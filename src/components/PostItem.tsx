import { IconButton } from "@chakra-ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";
import EditDeleteButtonGroup from "./EditDeleteButtonGroup";

interface PostItemProps {
  post: PostSnippetFragment;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex p={5} shadow="md" borderWidth="1px">
      <Box
        flexDirection="column"
        display="flex"
        mt="auto"
        mb="auto"
        alignItems="center"
        mr="20px"
      >
        <IconButton
          onClick={() => {
            if (post.voteStatus === 1) {
              return;
            }
            vote({
              value: 1,
              postId: post._id,
            });
          }}
          variant="ghost"
          aria-label="upvote"
          colorScheme={post.voteStatus === 1 ? "green" : "gray"}
          size="xs"
          borderRadius="full"
          icon={<ArrowUpIcon />}
        />
        {post.points}
        <IconButton
          onClick={() => {
            if (post.voteStatus === -1) {
              return;
            }
            vote({
              value: -1,
              postId: post._id,
            });
          }}
          variant="ghost"
          aria-label="downvote"
          colorScheme={post.voteStatus === -1 ? "red" : "gray"}
          size="sm"
          borderRadius="full"
          icon={<ArrowDownIcon />}
        />
      </Box>
      <Box flex={1}>
        <Text fontSize="xs" colorScheme="whiteAlpha">
          posted by {post.creator.username}
        </Text>
        <NextLink href="/post/[_id]" as={`/post/${post._id}`}>
          <Link>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        </NextLink>
        <Flex align="center">
          <Text mt={4} flex={1}>
            {post.textSnippet}
          </Text>
          <EditDeleteButtonGroup _id={post._id} creatorId={post.creator.id} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default PostItem;
