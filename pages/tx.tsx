import Head from "next/head";
import { NextPage } from "next";

import TxResult from "components/TxResult";

const StatsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Steak | Tx Result</title>
      </Head>
      <TxResult />
    </>
  );
};

export default StatsPage;
