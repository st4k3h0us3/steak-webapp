import { Box, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { FC } from "react";

import Header from "./Header";
import UnbondQueueItem from "./UnbondQueueItem";

const mockUnbondRequests = [
  {
    status: "pending",
    amount: "xxx,xxx.xx STEAK",
    startTime: new Date(),
    finishTime: new Date("2025-04-23"),
  },
  {
    status: "unbonding",
    amount: "xxx,xxx.xx LUNA",
    startTime: new Date(),
    finishTime: new Date("2023-03-12"),
  },
  {
    status: "completed",
    amount: "xxx,xxx.xx LUNA",
    startTime: new Date(),
    finishTime: new Date(),
  },
];

const UnbondQueue: FC = () => {
  const items = mockUnbondRequests.map((unbondRequest, index) => (
    <UnbondQueueItem key={index} {...unbondRequest} />
  ));

  return (
    <>
      <Header text="My Unbonding Requests" pb="0" />
      <Box overflowX="auto">
        <Table style={{ borderCollapse: "separate", borderSpacing: "0 0.6rem" }}>
          <Thead>
            <Tr>
              <Th borderBottom="none" bg="brand.darkBrown" color="white" borderLeftRadius="2xl">
                Status
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white">
                Amount
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white">
                Start Time
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white" borderRightRadius="2xl">
                Finish Time
              </Th>
            </Tr>
          </Thead>
          <Tbody>{items}</Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UnbondQueue;
