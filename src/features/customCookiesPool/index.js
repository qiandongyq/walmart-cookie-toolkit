import React from 'react';
import {
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Button
} from '@chakra-ui/core';
import { useCustomCookiesStore } from '../../store';
import { useForm } from 'react-hook-form';

export const CustomCookiesPool = () => {
  const {
    customCookies,
    addCustomCookie,
    deleteCustomCookie
  } = useCustomCookiesStore();
  const toast = useToast();
  const { handleSubmit, errors, register, reset } = useForm();

  const onSubmit = (values) => {
    addCustomCookie(values);
    reset();
  };

  const validateEmptyString = (value) => {
    let error;
    if (!value) {
      error = 'This filed is required';
    }
    return error || true;
  };

  const handleDeleteCustomItem = (cookie) => {
    deleteCustomCookie(cookie);
    toast({
      title: `Success`,
      description: `${cookie.name} is removed from your custom items pool`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} isInline>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">
              Name{' '}
              <Text as="em" color="red.400">
                *
              </Text>
            </FormLabel>
            <Input
              name="name"
              placeholder="ng-auth"
              ref={register({ validate: validateEmptyString })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.value}>
            <FormLabel htmlFor="value">
              Value{' '}
              <Text as="em" color="red.400">
                *
              </Text>
            </FormLabel>
            <Input
              name="value"
              placeholder="true"
              ref={register({ validate: validateEmptyString })}
            />
            <FormErrorMessage>
              {errors.value && errors.value.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.value}>
            <FormLabel htmlFor="addButton" visibility="hidden">
              addButton
            </FormLabel>
            <Box>
              <Button type="submit">Add</Button>
            </Box>
          </FormControl>
        </Stack>
      </form>
      {Object.keys(customCookies).map((key) => (
        <Tag key={key} variantColor="teal" mr={3} mt={3}>
          <TagLabel>
            {customCookies[key].name} = {customCookies[key].value}
          </TagLabel>
          <TagCloseButton
            onClick={() => handleDeleteCustomItem(customCookies[key])}
          />
        </Tag>
      ))}
    </Box>
  );
};
