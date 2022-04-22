import { chakra, Link, Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

import Header from "./Header";
import { useBalances } from "../hooks";
import { formatNumber } from "../helpers";

const bondOrUnbondStyle = {
  transition: "0.2s all",
  outline: "none",
  borderRadius: "md",
  color: "brand.red",
  bg: "white",
  px: "10",
  py: "2",
  m: "1",
  _hover: {
    color: "brand.black",
    bg: "brand.lightBrown",
    textDecoration: "none",
  },
};

const MySteak: FC = () => {
  const { balances } = useBalances();

  return (
    <>
      <Header text="My Steak">
        <Link variant="submit" href="https://app.astroport.fi">
          Trade STEAK
        </Link>
      </Header>
      <Box color="white" bg="brand.red" p="12" mb="6" borderRadius="2xl" textAlign="center">
        <Text fontSize="6xl" fontWeight="800">
          {formatNumber(balances ? balances.usteak / 1e6 : 0, 3)}
        </Text>
        <Text fontSize="sm" fontWeight="800">
          (= $xxx,xxx.xx)
        </Text>
        <Text color="brand.lightBrown" mt="5">
          My staked STEAK
        </Text>
        <Flex direction={["column", "row", null, null]} justify="center" mt="10">
          <NextLink href="/bond" passHref>
            <chakra.a {...bondOrUnbondStyle}>Stake LUNA</chakra.a>
          </NextLink>
          <NextLink href="/unbond" passHref>
            <chakra.a {...bondOrUnbondStyle}>Unstake STEAK</chakra.a>
          </NextLink>
        </Flex>
      </Box>
    </>
  );
};

export default MySteak;
