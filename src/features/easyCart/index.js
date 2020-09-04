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
  Tooltip,
  useToast,
} from '@chakra-ui/core';

import { useForm } from 'react-hook-form';
import * as cartHelper from '../../helpers/cartHelper';

export const EasyCart = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const [env, setEnv] = React.useState('QA');
  const toast = useToast();

  const onSubmit = async (values) => {
    const items = cartHelper.getItems(values);
    if (items.length !== 0) {
      try {
        await cartHelper.addItemsToCart(items, env);
        toast({
          title: `Success`,
          description: `${items.length} items be added`,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'bottom-left',
        });
      } catch (e) {
        toast({
          title: `An error occurred.`,
          description: `Unable to add items`,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    } else {
      toast({
        title: `Warning`,
        description: `Nothing to add!`,
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom-left',
      });
    }

    reset();
  };

  const { isSubmitting } = formState;

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
              <InputLeftAddon
                children={
                  <Tooltip label="GM Items" placement="top">
                    Ct
                  </Tooltip>
                }
              />

              <NumberInput defaultValue={0} min={0} max={5}>
                <NumberInputField name="gmCount" ref={register} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <InputGroup maxW="50%">
              <InputLeftAddon
                children={
                  <Tooltip
                    label="Minimium Price (Apply to all GM filters)"
                    placement="top"
                  >
                    {'$ >='}
                  </Tooltip>
                }
                color="teal.200"
              />
              <NumberInput defaultValue={0} min={0}>
                <NumberInputField name="gmPrice" ref={register} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </Stack>
          <Box mt={3} borderStyle="dashed" borderWidth="1px" p={3}>
            <Stack isInline spacing={4}>
              <InputGroup maxW="50%">
                <InputLeftAddon
                  children={
                    <Tooltip label="Limites Stock" placement="top">
                      LS
                    </Tooltip>
                  }
                />
                <NumberInput defaultValue={0} min={0} max={5}>
                  <NumberInputField name="gmLsCount" ref={register} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              <InputGroup maxW="50%">
                <InputLeftAddon
                  children={
                    <Tooltip label="Out of Stock" placement="top">
                      OS
                    </Tooltip>
                  }
                />
                <NumberInput defaultValue={0} min={0} max={5}>
                  <NumberInputField name="gmOsCount" ref={register} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Stack>
            <Stack isInline mt={3} spacing={4}>
              <InputGroup maxW="50%">
                <InputLeftAddon
                  children={
                    <Tooltip label="  3P Items" placement="top">
                      3P
                    </Tooltip>
                  }
                />
                <NumberInput defaultValue={0} min={0} max={5}>
                  <NumberInputField name="gm3pCount" ref={register} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
              <InputGroup maxW="50%">
                <InputLeftAddon
                  children={
                    <Tooltip label="Digital Items" placement="top">
                      DT
                    </Tooltip>
                  }
                />
                <NumberInput defaultValue={0} min={0} max={5}>
                  <NumberInputField name="gmDigitalCount" ref={register} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Stack>
          </Box>
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
            <InputLeftAddon
              children={
                <Tooltip label=" Grocery Items" placement="top">
                  Go
                </Tooltip>
              }
            />
            <NumberInput defaultValue={0} min={0} max={5}>
              <NumberInputField name="goCount" ref={register} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup maxW="50%">
            <InputLeftAddon
              children={
                <Tooltip
                  label="Minimum Price (Apply to all GO filters)"
                  placement="top"
                >
                  {'$ >='}
                </Tooltip>
              }
              color="teal.200"
            />
            <NumberInput defaultValue={0} min={0} max={50}>
              <NumberInputField name="goPrice" ref={register} />
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
