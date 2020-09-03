import React from 'react';
import {
  Stack,
  Box,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
  Divider,
  Flex,
} from '@chakra-ui/core';

import { useForm } from 'react-hook-form';

export const EasyCart = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack isInline spacing={4}>
        <InputGroup maxW="50%">
          <InputLeftAddon children="GM" />
          <NumberInput size="md" defaultValue={0} min={0} max={5}>
            <NumberInputField name="gm" ref={register} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
        <InputGroup maxW="50%">
          <InputLeftAddon children="GR" />
          <NumberInput size="md" defaultValue={0} min={0} max={5}>
            <NumberInputField name="gr" ref={register} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Stack>
      <Stack mt={5}>
        <InputGroup>
          <InputLeftAddon children="Sku id" />
          <Input
            size="md"
            defaultValue={0}
            placeholder="sku id"
            ref={register}
            name="skuId"
          />
        </InputGroup>
      </Stack>
      <Stack mt={5} isInline spacing={4}>
        <InputGroup maxW="50%">
          <InputLeftAddon children="LS" />
          <NumberInput size="md" defaultValue={0} min={0} max={5}>
            <NumberInputField name="ls" ref={register} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
        <InputGroup maxW="50%">
          <InputLeftAddon children="OS" />
          <NumberInput size="md" defaultValue={0} min={0} max={5}>
            <NumberInputField name="os" ref={register} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Stack>

      <Button
        mt={5}
        variantColor="teal"
        type="submit"
        variant="outline"
        w="100%"
      >
        Add
      </Button>
    </form>
  );
};
