import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/core';
import { VERSION } from '../config';
export const FullPageHeader = () => {
  return (
    <Flex
      align="center"
      justify="center"
      py={5}
      boxShadow="lg"
      position="relative"
    >
      <Heading as="h1">Walmart Dev Toolkit </Heading>
      <Text position="absolute" right={5} bottom={2}>
        Version {VERSION}
      </Text>
    </Flex>
  );
};
