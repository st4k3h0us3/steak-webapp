import { Container, Flex, Box, Image, HStack } from "@chakra-ui/react";
import { FC } from "react";
import NextLink from "next/link";

import NavbarLink from "./NavbarLink";

const Navbar: FC = () => {
  return (
    <Container maxW="container.xl" px={["6", null, "12"]} pt="8" position="relative" centerContent>
      <Flex w="100%" justify="space-between" align="center">
        <Box flexShrink={0}>
          <NextLink href="/" passHref>
            <a>
              <Image src="/steak.svg" alt="Steak"></Image>
            </a>
          </NextLink>
        </Box>
        <Box flex="1">
          <HStack flex="1" px="16" spacing="12">
            <NavbarLink text="My Steak" href="/"></NavbarLink>
            <NavbarLink text="Protocol Stats" href="stats" underConstruction={true}></NavbarLink>
          </HStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
