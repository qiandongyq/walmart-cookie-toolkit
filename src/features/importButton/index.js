import React from 'react';
import { Box, Button, Heading, Flex } from '@chakra-ui/core';
import { useProfileStore } from '../../store';

export const ImportButton = () => {
  const { defaultProfile } = useProfileStore();
  return (
    <Box>
      <Flex align="center" justify="center" mb="5" color="white">
        <Heading size="lg" isTruncated>
          {defaultProfile.title}
        </Heading>
      </Flex>
      <Button
        mt={5}
        size="lg"
        w="100%"
        onClick={null}
        variantColor="teal"
        variant="outline"
      >
        Import
      </Button>
    </Box>
  );
};
