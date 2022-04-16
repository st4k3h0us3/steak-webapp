import { FC, ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const Popover: FC<Props> = ({ children, isOpen, onClose, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent mx="4">
        <Flex justify="space-between" px={["0", "6"]} pb="2" align="center">
          <ModalHeader flex={1} fontSize="2xl" fontWeight="800">
            {title}
          </ModalHeader>
          <ModalCloseButton />
        </Flex>
        <ModalBody px={["0", "inherit"]}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popover;
