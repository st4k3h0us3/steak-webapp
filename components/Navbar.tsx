import {
  chakra,
  useDisclosure,
  Flex,
  Box,
  Button,
  HStack,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import React, { FC } from "react";
import NextLink from "next/link";

import BurgerIcon from "./BurgerIcon";
import CloseIcon from "./CloseIcon";
import SteakIcon from "./SteakIcon";
import NavbarLink from "./NavbarLink";
import WalletInfo from "./WalletInfo";
import WalletConnect from "./WalletConnect";

const Navbar: FC = () => {
  const { status } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box w="100%" py="6">
      <Flex w="100%" justify="space-between" align="center">
        <NextLink href="/" passHref>
          <chakra.a>
            <SteakIcon w={["3rem", "4rem"]} h={["3rem", "4rem"]} />
          </chakra.a>
        </NextLink>
        <HStack display={["none", null, null, "block"]} flex="1" px="16" spacing="12">
          <NavbarLink text="My Steak" href="/" />
          <NavbarLink text="Protocol Stats" href="/stats" />
        </HStack>
        <HStack justify="flex-end">
          {status === WalletStatus.WALLET_CONNECTED ? <WalletInfo /> : <WalletConnect />}
          <Button
            display={[null, null, null, "none"]}
            variant="simple"
            minW="1.5rem"
            pl="1"
            ref={btnRef}
            onClick={onOpen}
          >
            <BurgerIcon color="brand.black" width="1.5rem" height="1.5rem" />
          </Button>
        </HStack>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" size="sm" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            height="100%"
            bg="brand.lightBrown"
            zIndex="100"
            px={["6", null, "12"]}
            py="8"
            direction="column"
          >
            <Flex justify="space-between" width="100%" align="center">
              <Box flexShrink={0}>
                <SteakIcon w={["3rem", "4rem"]} h={["3rem", "4rem"]} />
              </Box>
              <Button variant="simple" mr="-2" onClick={onClose}>
                <CloseIcon color="white" width="1.5rem" height="1.5rem" />
              </Button>
            </Flex>
            <VStack align="flex-start" mt="20">
              <NavbarLink onClick={onClose} text="My Steak" href="/" />
              <NavbarLink onClick={onClose} text="Protocol Stats" href="/stats" />
            </VStack>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
