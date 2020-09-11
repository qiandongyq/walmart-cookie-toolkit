import React from 'react';
import { Box, Button, Heading, Flex, useToast, Stack } from '@chakra-ui/core';
import {
  useProfileStore,
  useCommonSettingsStore,
  useCustomCookiesStore
} from '../../store';
import * as cookieHelper from '../../helpers/cookieHelper';
import * as tabHelper from '../../helpers/tabHelper';
import { COMMON_SETTINGS_TYPE, CHROME_STORE_ID } from '../../helpers/constants';

export const ImportButton = () => {
  const { defaultProfile, profiles } = useProfileStore();
  const { commonSettings } = useCommonSettingsStore();
  const { customCookies } = useCustomCookiesStore();
  const toast = useToast();

  const handleImport = async () => {
    try {
      const allCookies = await cookieHelper.importAllCookies(
        defaultProfile.url,
        CHROME_STORE_ID.NORMAL_MODE_STORE,
        customCookies
      );

      toast({
        title: `Success`,
        description: `${allCookies.length} cookies imported.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      if (commonSettings[COMMON_SETTINGS_TYPE.AUTO_REFRESH].isEnabled) {
        await tabHelper.reloadActivePage();
      }

      if (commonSettings[COMMON_SETTINGS_TYPE.RTC_ON_IMPORT].isEnabled) {
        await tabHelper.redirectToCheckout();
      }
    } catch (err) {
      toast({
        title: `An error occurred.`,
        description: `Unable to import cookies`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }
  };
  return (
    <Box>
      <Flex align="center" justify="center" mb="5" color="white">
        {defaultProfile && (
          <Heading size="lg" isTruncated>
            {defaultProfile.title}
          </Heading>
        )}
      </Flex>
      <Stack mt={3} isInline spacing={6} alignItems="center">
        <Button
          size="lg"
          w="100%"
          onClick={handleImport}
          variantColor="teal"
          variant="outline"
          isDisabled={profiles.length === 0}
        >
          Import
        </Button>
      </Stack>
    </Box>
  );
};
