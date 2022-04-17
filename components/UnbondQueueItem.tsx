import { chakra, Tr, Td, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

type Props = {
  status: string;
  amount: string;
  startTime: Date;
  finishTime: Date;
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const UnbondQueueItem: FC<Props> = ({ status, amount, startTime, finishTime }) => {
  const currentTime = new Date();

  const finishTimeItem =
    currentTime >= finishTime ? (
      <NextLink href="/withdraw" passHref>
        <chakra.a
          transition="0.2s all"
          outline="none"
          border="solid 2px #d9474b"
          borderRadius="md"
          color="white"
          bg="brand.red"
          px="10"
          py="2"
          _hover={{
            color: "brand.red",
            bg: "white",
            textDecoration: "none",
          }}
        >
          Claim LUNA
        </chakra.a>
      </NextLink>
    ) : (
      <Text>{finishTime.toLocaleString()}</Text>
    );

  return (
    <Tr bg="white" mb="2">
      <Td borderBottom="none" py="6" borderLeftRadius="2xl">
        {capitalizeFirstLetter(status)}
      </Td>
      <Td borderBottom="none" py="6" minW="200px">
        {amount}
      </Td>
      <Td borderBottom="none" py="6" minW="230px">
        {startTime.toLocaleString()}
      </Td>
      <Td borderBottom="none" py="6" minW="230px" borderRightRadius="2xl">
        {finishTimeItem}
      </Td>
    </Tr>
  );
};

export default UnbondQueueItem;
