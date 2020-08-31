import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Icon,
  Divider,
  useColorMode,
  Collapse,
  IconButton,
  Image,
  Stack,
  Text,
  Grid,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core';

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
      <Heading as="h1">Walmart Cookie Toolkit </Heading>
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
