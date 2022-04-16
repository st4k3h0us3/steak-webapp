import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";

import Header from "./Header";
import OverviewItem from "./OverviewItem";

const Overview: FC = () => {
  return (
    <>
      <Header text="Overview" />
      <SimpleGrid minChildWidth="250px" spacing="10px" mb="6">
        <OverviewItem
          primaryText="$1,234,567,890"
          secondaryText="(123,456 LUNA)"
          additionalText="Total value locked"
        />
        <OverviewItem
          primaryText="1.02"
          secondaryText="LUNA per STEAK"
          additionalText="Exchange ratio"
        />
        <OverviewItem
          primaryText="420.69%"
          secondaryText="(daily profit $xxx.xx)"
          additionalText="Current APY"
        />
      </SimpleGrid>
    </>
  );
};

export default Overview;
