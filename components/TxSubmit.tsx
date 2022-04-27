import { Msg } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useConstants } from "hooks";
import { FC } from "react";

import ModalWrapper from "./ModalWrapper";

type Props = {
  msgs: Msg[];
  isOpen: boolean;
  onClose: () => void;
};

const TxSubmit: FC<Props> = ({ msgs, isOpen, onClose }) => {
  const wallet = useConnectedWallet();
  const { gasConfigs } = useConstants(wallet?.network.name);

  const tx = { msgs, ...gasConfigs };
  const content = JSON.stringify(tx, null, 2);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Transaction status">
      {content}
    </ModalWrapper>
  );
};

export default TxSubmit;
