import React from 'react';
import { Box, Heading, Flex, useColorMode, IconButton } from '@chakra-ui/core';

export const FullpageHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      align="center"
      justify="center"
      py={5}
      boxShadow="lg"
      position="relative"
    >
      <Heading as="h1">Walmart Dev Toolkit </Heading>
      <Box position="absolute" right={10}>
        {colorMode === 'light' ? (
          <IconButton
            icon="moon"
            aria-label="theme"
            onClick={toggleColorMode}
          ></IconButton>
        ) : (
          <IconButton
            icon="sun"
            aria-label="theme"
            onClick={toggleColorMode}
          ></IconButton>
        )}
      </Box>
    </Flex>
  );
};
