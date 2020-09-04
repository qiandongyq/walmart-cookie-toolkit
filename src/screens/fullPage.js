import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import { CollapseSection, FullpageHeader } from '../components';
import { Profile } from '../features';
// import { EasyCart, LocalizePricing } from '../features';

const FullPage = () => {
  return (
    <Box w="full" minH="100vh">
      <FullpageHeader />
      <Grid gap={10} mt={5} px={5}>
        <CollapseSection title="Profiles">
          <Profile />
        </CollapseSection>
        {/* <EasyCart />
        <LocalizePricing /> */}
      </Grid>
    </Box>
  );
};

export default FullPage;
