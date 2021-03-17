import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteButtonGroupProps {
  _id: number;
  creatorId: number;
}

const EditDeleteButtonGroup: React.FC<EditDeleteButtonGroupProps> = ({
  _id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href="/post/edit/[_id]" as={`/post/edit/${_id}`}>
        <IconButton
          as={Link}
          variant="ghost"
          aria-label="edit post"
          colorScheme="gray"
          size="sm"
          mr={3}
          borderRadius="full"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        onClick={() => deletePost({ _id: _id })}
        variant="ghost"
        aria-label="delete post"
        colorScheme="gray"
        size="sm"
        borderRadius="full"
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default EditDeleteButtonGroup;
