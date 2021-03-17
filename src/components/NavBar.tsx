import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";

import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();

  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={3} color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/create-post">
          <Link mr={3}>create post</Link>
        </NextLink>
        <Box color="white" mr={3}>
          {data.me.username}
        </Box>
        <Button
          variant="link"
          colorScheme="blackAlpha"
          isLoading={logoutFetching}
          onClick={async () => {
            await logout();
            router.reload();
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      bg="blue.400"
      p={4}
      position="sticky"
      top="0"
      align="center"
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>SMA</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
