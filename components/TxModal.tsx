import { Box, Button, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Msg } from "@terra-money/terra.js";
import {
  useConnectedWallet,
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { FC, useState, useEffect } from "react";

import ModalWrapper from "./ModalWrapper";
import SuccessIcon from "./SuccessIcon";
import FailedIcon from "./FailedIcon";
import { useConstants } from "../hooks";
import { truncateString } from "../helpers";
import { useStore } from "../store";

function SpinnerWrapper() {
  return (
    <Spinner thickness="6px" speed="1s" emptyColor="transparent" color="brand.red" size="xl" />
  );
}

function CloseButton(onClick: () => void) {
  return (
    <Button variant="primary" mt="12" onClick={onClick}>
      Close
    </Button>
  );
}

type Props = {
  msgs: Msg[];
  isOpen: boolean;
  onClose: () => void;
};

const TxModal: FC<Props> = ({ msgs, isOpen, onClose }) => {
  const wallet = useConnectedWallet();
  const store = useStore();
  const { gasOptions } = useConstants(wallet?.network.name);
  const [txStatusHeader, setTxStatusHeader] = useState<string>();
  const [txStatusIcon, setTxStatusIcon] = useState<JSX.Element>();
  const [txStatusDetail, setTxStatusDetail] = useState<JSX.Element>();

  useEffect(() => {
    setTxStatusHeader("Transaction Pending");
    setTxStatusIcon(SpinnerWrapper);
    setTxStatusDetail(<Text>Waiting for confirmation...</Text>);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && wallet) {
      wallet
        .post({ msgs, ...gasOptions })
        .then((result) => {
          setTxStatusHeader("Transaction Successful");
          setTxStatusIcon(<SuccessIcon h="80px" w="80px" />);
          setTxStatusDetail(
            <>
              <Flex>
                <Text variant="dimmed" ml="auto" mr="3">
                  Tx Hash
                </Text>
                <Link
                  ml="3"
                  mr="auto"
                  my="auto"
                  isExternal
                  href={`https://terrasco.pe/${wallet?.network.name}/tx/${result.result.txhash}`}
                  _hover={{ textDecoration: "none" }}
                >
                  {truncateString(result.result.txhash, 6, 6)}
                  <ExternalLinkIcon
                    ml="2"
                    style={{
                      transform: "translateY(-2.4px)",
                    }}
                  />
                </Link>
              </Flex>
              {CloseButton(onClose)}
            </>
          );
          store.update(wallet); // refresh store once tx is completed
        })
        .catch((error) => {
          setTxStatusHeader("Transaction Failed");
          setTxStatusIcon(<FailedIcon h="80px" w="80px" />);
          setTxStatusDetail(
            <>
              <Flex>
                <Text variant="dimmed" ml="auto" mr="3">
                  Reason
                </Text>
                <Text ml="3" mr="auto">
                  {error instanceof CreateTxFailed
                    ? "Failed to create tx"
                    : error instanceof Timeout
                    ? "Timeout"
                    : error instanceof TxFailed
                    ? "Tx failed"
                    : error instanceof TxUnspecifiedError
                    ? "Unspecified"
                    : error instanceof UserDenied
                    ? "User denied"
                    : "Unknown"}
                </Text>
              </Flex>
              {CloseButton(onClose)}
            </>
          );
        });
    }
  }, [isOpen]);

  return (
    <ModalWrapper showHeader={false} isOpen={isOpen} onClose={onClose}>
      <Box w="100%" textAlign="center">
        <Text fontSize="xl" textStyle="minibutton" mt="10">
          {txStatusHeader}
        </Text>
        <Flex w="100%" h="150px" align="center" justify="center">
          {txStatusIcon}
        </Flex>
        <Box mt="3" mb="10">
          {txStatusDetail}
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default TxModal;
