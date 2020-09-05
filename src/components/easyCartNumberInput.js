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

export const EasyCartNumerInput = ({ tl, fn, fc, n, r, ...props }) => {
  return (
    <InputGroup maxW="50%" {...props}>
      <InputLeftAddon color={fc}>
        <Tooltip label={tl} placement="top">
          {fn}
        </Tooltip>
      </InputLeftAddon>

      <NumberInput defaultValue={0} min={0}>
        <NumberInputField name={n} ref={r} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </InputGroup>
  );
};
