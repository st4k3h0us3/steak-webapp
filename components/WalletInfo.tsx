import { Box, Button, Center, Link, Flex, HStack, VStack, Text } from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useWallet, useConnectedWallet } from "@terra-money/wallet-provider";
import copy from "copy-to-clipboard";
import { FC } from "react";

import PopoverWrapper from "./PopoverWrapper";
import WalletIcon from "./WalletIcon";
import WalletNetwork from "./WalletNetwork";
import { useBalances } from "../hooks";
import { truncateString, formatNumber } from "../helpers";

/**
 * @dev NOTE: This element is only rendered when wallet is connected, so we can assume `wallet` is defined.
 */
const WalletInfo: FC = () => {
  const { disconnect } = useWallet();
  const wallet = useConnectedWallet();
  const balances = useBalances();

  return (
    <PopoverWrapper
      title="My wallet"
      triggerElement={() => (
        <Button type="button" bg="none" p="0" _hover={{ bg: "none" }}>
          <WalletNetwork network={wallet?.network.name} />
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
                <WalletIcon w="1.25rem" h="1.25rem" />
                <Text fontSize="md" color="white">
                  {truncateString(wallet?.terraAddress)}
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
                  {balances ? formatNumber(balances.uusd / 1e6) : "0.00"}
                </Text>
              </HStack>
            </Center>
          </Flex>
        </Button>
      )}
    >
      <Flex direction="column" justify="center" px="2">
        <VStack mt={6} align="flex-start">
          <Text textStyle="minibutton">My Address</Text>
          <Text textStyle="small" variant="dimmed">
            {wallet?.terraAddress}
          </Text>
        </VStack>
        <Flex mt={3} justify="left" verticalAlign="middle">
          <Button onClick={() => copy(wallet!.terraAddress)} variant="simple">
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
            href={`https://terrasco.pe/${wallet?.network.name}/address/${wallet?.terraAddress}`}
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
        <Box mt="6">
          <Button type="button" variant="primary" isFullWidth onClick={disconnect}>
            Disconnect
          </Button>
        </Box>
      </Flex>
    </PopoverWrapper>
  );
};

export default WalletInfo;
