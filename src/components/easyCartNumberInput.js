import React from 'react';
import {
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip
} from '@chakra-ui/core';

export const EasyCartNumerInput = ({
  tl,
  fn,
  fc,
  onChange,
  value,
  ...props
}) => {
  return (
    <InputGroup maxW="50%" {...props}>
      <InputLeftAddon color={fc}>
        <Tooltip label={tl} placement="top">
          {fn}
        </Tooltip>
      </InputLeftAddon>

      <NumberInput defaultValue={0} min={0} onChange={onChange} value={value}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </InputGroup>
  );
};
