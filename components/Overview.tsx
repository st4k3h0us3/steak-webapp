import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";

import Header from "./Header";
import OverviewItem from "./OverviewItem";

const Overview: FC = () => {
  return (
    <>
      <Header text="Overview" />
      <SimpleGrid minChildWidth="300px" spacing="10px" mb="6">
        <OverviewItem
          primaryText="$1,234,567,890"
          secondaryText="(123,456 LUNA)"
          additionalText="Total value locked"
          textAlign="left"
        />
        <OverviewItem
          primaryText="1.02"
          secondaryText="(STEAK = $xxx.xx)"
          additionalText="Exchange ratio (Luna per Steak)"
          textAlign="center"
        />
        <OverviewItem
          primaryText="420.69%"
          secondaryText="(daily profit $xxx.xx)"
          additionalText="Current APY"
          textAlign="right"
        />
      </SimpleGrid>
    </>
  );
};

export default Overview;
