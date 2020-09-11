import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import { CollapseSection, FullPageHeader } from '../components';
import {
  Profile,
  CommonSettings,
  BasProfile,
  Sync,
  Reset,
  CustomItemsPool,
  CustomCookiesPool
} from '../features';

const FullPage = () => {
  return (
    <Box w="100%" minH="100vh" mb={10}>
      <FullPageHeader />

      {/* Profils */}
      <Box maxW="70%" mx="auto">
        <Grid gap={10} mt={5} px={5}>
          <CollapseSection title="Profiles">
            <Profile />
          </CollapseSection>
        </Grid>

        {/* Slot profiles */}
        <Grid gap={10} mt={10} px={5}>
          <CollapseSection title="Book a Slot">
            <BasProfile />
          </CollapseSection>
        </Grid>

        {/* Custom profile pool */}
        <Grid gap={10} mt={10} px={5}>
          <CollapseSection title="Custom Items Pool">
            <CustomItemsPool />
          </CollapseSection>
        </Grid>

        {/* Common cookies */}
        <Grid gap={10} mt={10} px={5}>
          <CollapseSection title="Custom Cookies Pool">
            <CustomCookiesPool />
          </CollapseSection>
        </Grid>

        {/* Common settings */}
        <Grid gap={10} mt={10} px={5}>
          <CollapseSection title="Common Settings">
            <CommonSettings />
          </CollapseSection>
        </Grid>

        {/* Reset */}
        <Grid gap={10} mt={10} px={5}>
          <CollapseSection title="Reset">
            <Reset />
          </CollapseSection>
        </Grid>

        {/* Sync */}
        <Grid gap={10} mt={10} px={5}>
          <CollapseSection title="Sync and Share">
            <Sync />
          </CollapseSection>
        </Grid>
      </Box>
    </Box>
  );
};

export default FullPage;
