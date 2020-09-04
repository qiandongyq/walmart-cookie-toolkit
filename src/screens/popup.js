import React from 'react';
import { Box } from '@chakra-ui/core';
import { ImportButton, HeaderActions } from '../features';
import { FeatureSection } from '../components';

const Popup = () => {
  return (
    <Box w={400}>
      <HeaderActions />
      <Box px="10" pt="3">
        <ImportButton />
        <FeatureSection />
      </Box>
    </Box>
  );
};

export default Popup;
