import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { FC } from "react";

import Header from "./Header";

const MySteak: FC = () => {
  return (
    <>
      <Header text="My Steak">
        <Link variant="trade" href="https://app.astroport.fi">
          Trade STEAK
        </Link>
      </Header>
      <Box color="white" bg="brand.red" p="12" mb="6" borderRadius="2xl" textAlign="center">
        <Text fontSize="6xl" fontWeight="800">
          17,118.90
        </Text>
        <Text fontSize="sm" fontWeight="800">
          (= $xxx,xxx.xx)
        </Text>
        <Text color="brand.lightBrown" mt="5">
          My staked STEAK
        </Text>
        <Flex direction={["column", "row", null, null]} justify="center" mt="10">
          <Link m="1" variant="bondOrUnbond" href="/bond">
            Stake LUNA
          </Link>
          <Link m="1" variant="bondOrUnbond" href="/unbond">
            Unstake STEAK
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default MySteak;
