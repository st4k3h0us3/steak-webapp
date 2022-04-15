import { Tr, Td, Text, Link } from "@chakra-ui/react";
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
      <Link variant="submit" href="/withdraw-unbonded" whiteSpace="nowrap">
        Claim LUNA
      </Link>
    ) : (
      <Text>{finishTime.toLocaleString()}</Text>
    );

  return (
    <Tr bg="white" mb="2">
      <Td borderBottom="none" py="6" borderLeftRadius="2xl">
        {capitalizeFirstLetter(status)}
      </Td>
      <Td borderBottom="none" py="6">
        {amount}
      </Td>
      <Td borderBottom="none" py="6">
        {startTime.toLocaleString()}
      </Td>
      <Td borderBottom="none" py="6" borderRightRadius="2xl">
        {finishTimeItem}
      </Td>
    </Tr>
  );
};

export default UnbondQueueItem;
