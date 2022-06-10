import {Box, Table, Thead, Tbody, Tr, Th, Tfoot} from "@chakra-ui/react";
import {useValidatorPerformance, useValidators} from "hooks";
import { FC } from "react";

import Header from "./Header";
import ValidatorsItem from "./ValidatorsItem";
import {ValidatorParsedPerformance} from "../store";

const UnbondQueue: FC = () => {
  const validators = useValidators();
  const validatorPerformance = useValidatorPerformance();
  const merged = validators.map( (x) => {
    const perf = validatorPerformance.get(x.operatorAddress);
   // console.log(x.operatorAddress,perf?.rewards_30d,perf?.picture)
    const merged : ValidatorParsedPerformance ={
      ...x ,
          ...perf
    }
    return merged
  })

  const items = merged.map((validator, index) => <ValidatorsItem key={index} {...validator} />);

  return (
    <>
      <Header text="Whitelisted Validators" pb="1" />
      <Box overflowX="auto">
        <Table style={{ borderCollapse: "separate", borderSpacing: "0 0.6rem" }}>
          <Thead>
            <Tr>
              <Th borderBottom="none" bg="brand.darkBrown" color="white" borderLeftRadius="2xl">
                Validator
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white">
                Status
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white">
                Voting Power
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white">
                Commission
              </Th>
              <Th borderBottom="none" bg="brand.darkBrown" color="white" borderRightRadius="2xl">
                Rewards*
              </Th>
            </Tr>
          </Thead>
          <Tbody>{items}</Tbody>
          <Tfoot>
            <tr><th colSpan={5}>*Reward number shown is estimated rewards for 100Luna staked for 30 days</th></tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default UnbondQueue;
