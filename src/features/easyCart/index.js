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
  Radio,
  RadioGroup,
  Heading,
} from '@chakra-ui/core';

import { useForm } from 'react-hook-form';
import * as cartHelper from '../../helpers/cartHelper';

export const EasyCart = () => {
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const [env, setEnv] = React.useState('QA');

  const onSubmit = async (values) => {
    const items = cartHelper.getItems(values);
    await cartHelper.addItemsToCart(items, env);
    reset();
  };
  const { isSubmitting } = formState;
  console.log(getValues('gmCount'));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack isInline my={5} spacing={4}>
        <RadioGroup
          isInline
          spacing={5}
          defaultValue="QA"
          onChange={(e) => setEnv(e.target.value)}
          value={env}
        >
          <Radio value="QA" variantColor="teal" size="md">
            QA
          </Radio>
          <Radio value="STG" variantColor="teal" size="md">
            STG
          </Radio>
        </RadioGroup>
      </Stack>
      <Stack mt={5}>
        <InputGroup>
          <InputLeftAddon children="SKU ID" />
          <Input
            type="text"
            placeholder="61499392212"
            name="skuId"
            ref={register}
          />
        </InputGroup>
      </Stack>
      <Box spacing={4} mt={5}>
        <Heading as="h3" size="sm" color="teal.200">
          GM
        </Heading>
        <Box>
          <Stack
            isInline
            mt={3}
            spacing={4}
            borderStyle="dashed"
            borderWidth="1px"
            p={3}
          >
            <InputGroup maxW="50%">
              <InputLeftAddon children="Ct" />
              <NumberInput defaultValue={0} min={0} max={5}>
                <NumberInputField name="gmCount" ref={register} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <InputGroup maxW="50%">
              <InputLeftAddon children="$ >=" color="teal.200" />
              <NumberInput defaultValue={50} min={0}>
                <NumberInputField name="gmPrice" ref={register} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </Stack>
          <Stack isInline mt={3} spacing={4}>
            <InputGroup maxW="50%" borderStyle="dashed" borderWidth="1px" p={3}>
              <InputLeftAddon children="LS" />
              <NumberInput defaultValue={0} min={0} max={5}>
                <NumberInputField name="gmLsCount" ref={register} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <InputGroup maxW="50%" borderStyle="dashed" borderWidth="1px" p={3}>
              <InputLeftAddon children="OS" />
              <NumberInput defaultValue={0} min={0} max={5}>
                <NumberInputField name="gmOsCount" ref={register} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </Stack>
        </Box>
      </Box>
      <Box spacing={4} mt={5}>
        <Heading as="h3" size="sm" color="teal.200">
          GO
        </Heading>
        <Stack
          isInline
          mt={3}
          spacing={4}
          borderStyle="dashed"
          borderWidth="1px"
          p={3}
        >
          <InputGroup maxW="50%">
            <InputLeftAddon children="Ct" />
            <NumberInput defaultValue={0} min={0} max={5}>
              <NumberInputField name="goCount" ref={register} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup maxW="50%">
            <InputLeftAddon children="$ >=" />
            <NumberInput defaultValue={0} min={0} max={50}>
              <NumberInputField name="goPrice" ref={register} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </Stack>
        <Stack isInline mt={3} spacing={4}>
          <InputGroup maxW="50%" borderStyle="dashed" borderWidth="1px" p={3}>
            <InputLeftAddon children="LS" />
            <NumberInput defaultValue={0} min={0} max={5}>
              <NumberInputField name="goLsCount" ref={register} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup maxW="50%" borderStyle="dashed" borderWidth="1px" p={3}>
            <InputLeftAddon children="OS" />
            <NumberInput defaultValue={0} min={0} max={5}>
              <NumberInputField name="goOsCount" ref={register} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </Stack>
      </Box>

      <Button
        isLoading={isSubmitting}
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
