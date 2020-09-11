import React from 'react';
import { customColor } from '../../theme';
import {
  Flex,
  PseudoBox,
  Box,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/core';
import {
  useSlotStore,
  useProfileStore,
  useCommonSettingsStore,
  useCustomItemsStore,
  useCustomCookiesStore
} from '../../store';

export const Reset = () => {
  const { colorMode } = useColorMode();
  const { resetSlots } = useSlotStore();
  const { resetCommonSettings } = useCommonSettingsStore();
  const { resetProfiles } = useProfileStore();
  const { resetCustomItems } = useCustomItemsStore();
  const { resetCustomCookies } = useCustomCookiesStore();
  const toast = useToast();

  const handleResetSlots = async () => {
    await resetSlots();
    toast({
      title: `Success`,
      description: `Default slots are restored`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleResetProfiles = async () => {
    await resetProfiles();
    toast({
      title: `Success`,
      description: `Default profiles are restored`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleResetCommonSettings = async () => {
    await resetCommonSettings();
    toast({
      title: `Success`,
      description: `Default common settings are restored`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleResetCustomItemsPool = async () => {
    await resetCustomItems();
    toast({
      title: `Success`,
      description: `Custom items pool are cleared`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleResetCustomCookies = async () => {
    await resetCustomCookies();
    toast({
      title: `Success`,
      description: `Custom cookies pool are cleared`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleResetAll = async () => {
    await resetSlots();
    await resetProfiles();
    await resetCommonSettings();
    await resetCustomItems();
    await resetCustomCookies();
    toast({
      title: `Success`,
      description: `Default settings are restored`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const resetActions = [
    {
      name: 'Reset Custom Items Pool',
      click: handleResetCustomItemsPool
    },
    {
      name: 'Reset Slots',
      click: handleResetSlots
    },
    {
      name: 'Reset Profiles',
      click: handleResetProfiles
    },
    {
      name: 'Reset Custom Cookies',
      click: handleResetCustomCookies
    },
    {
      name: 'Reset Common Settings',
      click: handleResetCommonSettings
    },

    {
      name: 'Reset All',
      click: handleResetAll,
      bg: 'red.500',
      shadow: '0 2px 8px rgba(229, 62, 62, 0.7)'
    }
  ];

  return (
    <Flex flexWrap="wrap">
      {resetActions.map((action) => (
        <PseudoBox
          key={action.name}
          rounded="md"
          cursor="pointer"
          bg={action.bg ? action.bg : customColor.card_bg[colorMode]}
          mt={3}
          mr={4}
          position="relative"
          transition="all 300ms"
          _hover={{
            boxShadow: action.shadow
              ? action.shadow
              : '0 2px 8px rgba(54, 230, 180,0.5)'
          }}
        >
          <Box px={4} py={2} overflow="hidden" onClick={action.click}>
            <Text fontSize="sm">{action.name}</Text>
          </Box>
        </PseudoBox>
      ))}
    </Flex>
  );
};
