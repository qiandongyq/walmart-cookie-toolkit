import React from 'react';
import {
  Stack,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Radio,
  RadioGroup,
  Heading,
  useToast
} from '@chakra-ui/core';

import { useForm } from 'react-hook-form';
import * as cartHelper from '../../helpers/cartHelper';
import { EasyCartNumerInput } from '../../components';

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
          position: 'top'
        });
      } catch (e) {
        toast({
          title: `An error occurred.`,
          description: `Unable to add items`,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      }
    } else {
      toast({
        title: `Warning`,
        description: `Nothing to add!`,
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
    reset();
  };

  const { isSubmitting } = formState;
  const handleEnvChange = (e) => setEnv(e.target.value);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack isInline my={5} spacing={4}>
        <RadioGroup
          isInline
          spacing={5}
          defaultValue="QA"
          onChange={handleEnvChange}
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
          <InputLeftAddon>SKU ID</InputLeftAddon>
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
            <EasyCartNumerInput
              tl="GM Items"
              fn="Ct"
              n="gmCount"
              r={register}
            />
            <EasyCartNumerInput
              tl="Minimium Price (Apply to all GM filters)"
              fn="$ >="
              fc="teal.200"
              n="gmPrice"
              r={register}
            />
          </Stack>
          <Box mt={3} borderStyle="dashed" borderWidth="1px" p={3}>
            <Stack isInline spacing={4}>
              <EasyCartNumerInput
                tl="Limites Stock"
                fn="LS"
                n="gmLsCount"
                r={register}
              />
              <EasyCartNumerInput
                tl="Out of Stock"
                fn="OS"
                n="gmOsCount"
                r={register}
              />
            </Stack>
            <Stack isInline mt={3} spacing={4}>
              <EasyCartNumerInput
                tl="3P Items"
                fn="3P"
                n="gm3pCount"
                r={register}
              />
              <EasyCartNumerInput
                tl="Digital Items"
                fn="DT"
                n="gmDigitalCount"
                r={register}
              />
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
          <EasyCartNumerInput
            tl="Grocery Items"
            fn="GO"
            n="goCount"
            r={register}
          />
          <EasyCartNumerInput
            tl="Minimum Price (Apply to all GO filters)"
            fn="$ >="
            n="goPrice"
            color="teal.200"
            r={register}
          />
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
