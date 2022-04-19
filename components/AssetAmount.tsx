import { NumberInput, NumberInputField, Flex, Box, Button, Text, HStack } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  amount: number,
  onChange: any;
  showMax: boolean;
};

const AssetAmount: FC<Props> = ({ amount, onChange, showMax }) => {
  const handleChange = (valueAsString: string, valueAsNumber: number) => {
    onChange(valueAsNumber);
  };

  const maxButton = showMax ? (
    <Button type="button" variant="mini" onClick={() => {}} isDisabled={false}>
      Max
    </Button>
  ) : null;

  return (
    <>
      <NumberInput
        value={amount}
        min={0}
        max={12345}
        precision={6}
        onChange={handleChange}
        onBlur={() => {}}
        onKeyPress={() => {}}
        clampValueOnBlur={true}
        isDisabled={false}
      >
        <NumberInputField
          h="16"
          bg="brand.darkBrown"
          fontSize="2xl"
          textAlign="right"
          p="4"
          pt="0"
          placeholder="0.0"
        />
        <Box position="absolute" bottom="2" right="1.1rem">
          <Text fontSize="small">$100.00</Text>
        </Box>
      </NumberInput>
      <Flex align="center" justify="space-between" mt="1">
        <Box>
          <HStack spacing="4">
            <Text variant="dimmed" fontSize="sm">
              In Wallet:
            </Text>
            <Text fontSize="sm" ml="2">
              12,345.67
            </Text>
          </HStack>
        </Box>
        <Box>{maxButton}</Box>
      </Flex>
    </>
  );
};

export default AssetAmount;
