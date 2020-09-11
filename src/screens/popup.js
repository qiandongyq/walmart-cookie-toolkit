import React from 'react';
import { Box } from '@chakra-ui/core';
import { ImportButton, HeaderActions } from '../features';
import { FeatureSection } from '../components';

import './popup.css';

const Popup = () => {
  return (
    <Box w={400} maxH={600} overflowY="scroll" className="popup">
      <HeaderActions />
      <Box px={10} pt={5}>
        <ImportButton />
        <FeatureSection />
      </Box>
    </Box>
  );
};

export default Popup;
