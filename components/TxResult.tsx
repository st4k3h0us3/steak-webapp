import { useRouter } from "next/router";
import { FC } from "react";

const TxResult: FC = () => {
  const router = useRouter();

  const { txhash } = router.query;

  return <>{txhash}</>;
};

export default TxResult;
