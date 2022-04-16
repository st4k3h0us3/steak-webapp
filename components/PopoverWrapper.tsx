import React, { FC, ReactNode } from "react";
import {
  Flex,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
  PopoverProps,
} from "@chakra-ui/react";

import CloseIcon from "./CloseIcon";

type Props = {
  title?: string;
  triggerElement: () => React.ReactElement;
  children: ReactNode;
} & PopoverProps;

const PopoverWrapper: FC<Props> = ({ title, triggerElement, children, ...props }) => {
  return (
    <Popover {...props}>
      <PopoverTrigger>{triggerElement()}</PopoverTrigger>
      <PopoverContent>
        <Flex align="center" justify="space-between">
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverCloseButton position="static" width="3rem" height="3rem">
            <CloseIcon w="2rem" h="2rem" />
          </PopoverCloseButton>
        </Flex>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
