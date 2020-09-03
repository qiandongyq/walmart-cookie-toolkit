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

import axios from 'axios';
import Cookies from 'js-cookie';

import { useForm } from 'react-hook-form';
import * as cartHelper from '../../helpers/cartHelper';

export const EasyCart = () => {
  const { register, handleSubmit } = useForm();

  const updateCartItems = ({
    postalCode = 'K1C1T1',
    items,
    storeId = '5540',
  }) => {
    axios.post(
      `https://www-qa2.walmart.ca/api/cart-page/cart?responseGroup=full&storeId=${storeId}&lang=en`,
      {
        postalCode,
        items,
      }
    );
  };

  const addItemsToCart = async (items) => {
    const postalCode = Cookies.get('walmart.shippingPostalCode');
    const storeId = Cookies.get('deliveryCatchment');

    // call api
    try {
      const res = await updateCartItems({
        postalCode,
        items,
        storeId,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (values) => {
    const items = cartHelper.getItems(values);
    console.log(items);
    await addItemsToCart(items);
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
