import React from 'react';
import { customColor } from '../../theme';
import {
  Flex,
  PseudoBox,
  Box,
  Text,
  useColorMode,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@chakra-ui/core';
import {
  useSlotStore,
  useProfileStore,
  useCommonSettingsStore,
  useCustomItemsStore,
  useCustomCookiesStore
} from '../../store';

import * as profileHelper from '../../helpers/profileHelper';
import * as slotHelper from '../../helpers/slotHelper';
import * as customItemsHelper from '../../helpers/customItemsPoolHelper';
import * as customCookiesHelper from '../../helpers/customCookiesPoolHelper';
import * as commonSettingsHelper from '../../helpers/commonSettingsHelper';

import { exportToDownload } from '../../utils/download';

export const Sync = () => {
  const [configFile, setConfigFile] = React.useState({});
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { resetProfiles } = useProfileStore();
  const { resetCommonSettings } = useCommonSettingsStore();
  const { resetCustomCookies } = useCustomCookiesStore();
  const { resetCustomItems } = useCustomItemsStore();
  const { resetSlots } = useSlotStore();

  const toast = useToast();

  const handleExport = async () => {
    const profiles = await profileHelper.getSyncStorageProfiles();
    const slots = await slotHelper.getSyncStorageSlots();
    const items = await customItemsHelper.getSyncStorageCustomItemsPool();
    const cookies = await customCookiesHelper.getSyncStorageCustomCookiesPool();
    const common = await commonSettingsHelper.getSyncStorageCommonSettings();
    const file = {
      profiles,
      slots,
      items,
      cookies,
      common
    };
    exportToDownload(file);
  };

  const openFileUploader = () => onOpen();

  const handleImport = async () => {
    await resetCommonSettings(configFile.common);
    await resetProfiles(configFile.profiles);
    await resetSlots(configFile.slots);
    await resetCustomItems(configFile.items);
    await resetCustomCookies(configFile.cookies);
    onClose();
    toast({
      title: `Success`,
      description: `Your data is restored from file`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      const fileString = e.target.result;
      setConfigFile(JSON.parse(fileString));
    });

    reader.readAsText(file);
  };

  const syncActions = [
    {
      name: 'Import',
      click: openFileUploader
    },
    {
      name: 'Export',
      click: handleExport
    }
  ];

  return (
    <>
      <Flex flexWrap="wrap">
        {syncActions.map((action) => (
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import Your Restore File Here</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input type="file" onChange={handleFileUpload}></Input>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="teal" mr={3} onClick={handleImport}>
              Import
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
