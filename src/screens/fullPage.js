import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import { CollapseSection, FullpageHeader } from '../components';
import { Profile } from '../features';

const FullPage = () => {
  return (
    <Box w="full" minH="100vh">
      <FullpageHeader />
      <Grid gap={10} mt={5} px={5}>
        <CollapseSection title="Profiles">
          <Profile />
        </CollapseSection>
        {/* <CollapseSection title="Qucik Actions">
          <Box h={16} borderStyle="dashed" borderWidth="1px"></Box>
        </CollapseSection>
        <CollapseSection title="Utilities">
          <Box h={16} borderStyle="dashed" borderWidth="1px"></Box>
        </CollapseSection> */}
      </Grid>
    </Box>
  );
};

export default FullPage;
