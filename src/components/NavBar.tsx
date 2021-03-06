import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";

import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

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
        <Box color="white" mr={3}>
          {data.me.username}
        </Box>
        <Button
          variant="link"
          colorScheme="blackAlpha"
          isLoading={logoutFetching}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="blue.400" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
