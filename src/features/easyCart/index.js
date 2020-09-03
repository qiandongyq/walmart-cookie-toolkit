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

  const updateCartItems = ({
    postalCode,
    items,
    storeId,
    lang,
    responseGroup = 'full',
  }) => {
    const queryStr = queryString({
      responseGroup,
      storeId,
      lang,
    });
    return fetchJSON(`/api/cart-page/cart?${queryStr}`, {
      method: 'POST',
      body: JSON.stringify({ postalCode, items }),
    });
  };
  const addItemsToCart = async (items) => {
    const postalCode = getCookieValue('walmart.shippingPostalCode');
    const lang = 'en';
    const storeId = getCookieValue('deliveryCatchment');
    const items = items.map((item) => ({
      action: 'ADD',
      offerId: item.offerId,
      quantity: 1,
      skuId: item.skuId,
    }));
    // add checked items to cart
    const res = await updateCartItems({
      postalCode,
      items,
      storeId,
      lang,
    });

    console.log(res);
  };
  const onSubmit = (data) => {
    item= {
      offerId: "string",
      skuId: "string",
      quantity: "number",
      action: "ADD",
      deliveryType?: "GM",
    }
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
