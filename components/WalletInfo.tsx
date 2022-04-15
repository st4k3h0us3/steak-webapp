import { formatAmount, useBalance } from "@arthuryeti/terra";
import { Box, Button, Center, Link, Flex, HStack, VStack, Image, Text } from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useWallet, useConnectedWallet } from "@terra-money/wallet-provider";
import copy from "copy-to-clipboard";
import { FC } from "react";

import { CHAIN_TO_FINDER_INFO } from "../constants";
import PopoverWrapper from "./PopoverWrapper";

function truncate(text: string = "", [h, t]: number[] = [10, 6]) {
  const head = text.slice(0, h);
  const tail = text.slice(-1 * t, text.length);
  return text.length > h + t ? [head, tail].join("...") : text;
}

const WalletInfoButtons: FC = () => {
  const { disconnect } = useWallet();
  const wallet = useConnectedWallet();
  const balance = useBalance("uusd");

  return (
    <PopoverWrapper
      title="My wallet"
      triggerElement={() => (
        <Button type="button" bg="none" _hover={{ bg: "none" }}>
          <Flex color="white" justify="center">
            <Box
              color="white"
              bg="brand.darkBrown"
              py="2"
              px="3"
              borderTopLeftRadius="full"
              borderBottomLeftRadius="full"
              mr="0.5"
            >
              <HStack spacing="3">
                <Image src="/terra.svg" alt="Terra" width="1.25rem" height="1.25rem" />
                <Text fontSize="md" color="white">
                  {truncate(wallet?.terraAddress)}
                </Text>
              </HStack>
            </Box>
            <Center
              color="white"
              bg="brand.darkBrown"
              py="2"
              px="3"
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
            >
              <HStack spacing="3">
                <Text fontSize="md" color="white">
                  UST
                </Text>
                <Text fontSize="md" color="white">
                  {formatAmount(balance, true, 6)}
                </Text>
              </HStack>
            </Center>
          </Flex>
        </Button>
      )}
    >
      <Flex direction="column" justify="center" w={["100%", "96"]}>
        <VStack mt={6} align="flex-start">
          <Text textStyle="minibutton">My Address</Text>
          <Text textStyle="small" variant="dimmed">
            {wallet.terraAddress}
          </Text>
        </VStack>
        <Flex mt={3} justify="left" verticalAlign="middle">
          <Button onClick={() => copy(wallet.terraAddress)} variant="simple">
            <HStack>
              <CopyIcon width="1.5rem" height="1.5rem" />
              <Text textStyle="small" variant="dimmed">
                Copy
              </Text>
            </HStack>
          </Button>
          <Link
            ml="6"
            my="auto"
            isExternal
            href={`https://terrasco.pe/${CHAIN_TO_FINDER_INFO[wallet.network.chainID]}/address/${wallet.terraAddress}`}
            _hover={{ textDecoration: "none" }}
          >
            <HStack>
              <ExternalLinkIcon width="1.5rem" height="1.5rem" />
              <Text textStyle="small" variant="dimmed">
                View on Terrascope
              </Text>
            </HStack>
          </Link>
        </Flex>
      </Flex>
      <Box mt="6">
        <Button type="button" variant="danger" isFullWidth onClick={disconnect}>
          Disconnect
        </Button>
      </Box>
    </PopoverWrapper>
  );
};

export default WalletInfoButtons;