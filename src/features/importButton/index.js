import React from 'react';
import { Box, Button, Heading, Flex, useToast } from '@chakra-ui/core';
import { useProfileStore } from '../../store';
import * as cookieHelper from '../../helpers/cookieHelper';

const NORMAL_MODE_STORE = '0';
// const INCOGNITO_MODE_STORE = '1';

export const ImportButton = () => {
  const { defaultProfile } = useProfileStore();
  const toast = useToast();

  const handleImport = async () => {
    try {
      const allCookies = await cookieHelper.getAllCookiesByStore(
        defaultProfile.url,
        NORMAL_MODE_STORE
      );

      const activeTab = await cookieHelper.getActiveTab();
      const activeStore = await cookieHelper.getStoreByTab(activeTab);
      for (const cookie of allCookies) {
        await cookieHelper.setCookie(cookie, activeTab, activeStore);
      }
      toast({
        title: `Success`,
        description: `${allCookies.length} cookies imported.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    } catch (err) {
      toast({
        title: `An error occurred.`,
        description: `Unable to import cookies, please try again.`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  };
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
        onClick={handleImport}
        variantColor="teal"
        variant="outline"
      >
        Import
      </Button>
    </Box>
  );
};
