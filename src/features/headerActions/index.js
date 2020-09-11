/* global chrome */
import React from 'react';
import { Flex, useToast, PseudoBox } from '@chakra-ui/core';
import { ActionIcon } from '../../components';
import { useProfileStore } from '../../store';
import * as cookieHelper from '../../helpers/cookieHelper';
import * as tabHelper from '../../helpers/tabHelper';
import { CHROME_STORE_ID } from '../../helpers/constants';
import { formatDocumentCookiesString } from '../../utils/cookie';

export const HeaderActions = () => {
  const [exportCookies, setExportCookies] = React.useState('');
  const { addToProfile } = useProfileStore();

  const toast = useToast();
  const openFullPage = () => {
    // When the icon is clicked, create a new tab pointing to the index page
    // Change this depending on your routes (in this case, the full page is the "/" route)
    chrome.tabs.create({
      url: chrome.extension.getURL('/index.html')
    });
  };

  const handleDeleteAllCookies = async () => {
    const allCookies = await cookieHelper.deleteAllCookies(
      CHROME_STORE_ID.NORMAL_MODE_STORE
    );
    toast({
      title: `Success`,
      description: `${allCookies.length} cookies are deleted.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleAddProfile = async () => {
    try {
      const newProfile = await addToProfile();
      toast({
        title: `Success`,
        description: `<${newProfile.title.slice(
          0,
          10
        )}...> added to your profile`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    } catch (err) {
      toast({
        title: `An error occurred.`,
        description: `Unable add to your profile`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleExportCookies = async () => {
    const activeTab = await tabHelper.getActiveTab();
    const cookies = await cookieHelper.getAllCookiesByStore(
      activeTab.url,
      CHROME_STORE_ID.NORMAL_MODE_STORE
    );
    const cookieString = formatDocumentCookiesString(cookies);
    setExportCookies(cookieString);
    var copyText = document.getElementById('export');
    copyText.select();
    document.execCommand('copy');
    toast({
      title: `Success`,
      description: 'Cookies import string is ready in your clipboard.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Flex justify="flex-end" position="relative">
      <PseudoBox
        className="no-select-color"
        position="absolute"
        w={1}
        color="gray.800"
        as="input"
        id="export"
        zIndex={-10}
        outline="none"
        bg="gray.800"
        value={exportCookies}
      ></PseudoBox>
      <Flex zIndex={10}>
        <ActionIcon
          action={handleDeleteAllCookies}
          iconName="delete"
          tooltip="Delete all cookies"
          size="20px"
          borderLeftWidth="1px"
          borderBottomWidth="1px"
          borderColor="gray.600"
          p={3}
        />
        <ActionIcon
          action={handleAddProfile}
          iconName="plus-square"
          tooltip="Add current site to profile"
          size="20px"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderBottomWidth="1px"
          borderColor="gray.600"
          p={3}
        />
        <ActionIcon
          action={handleExportCookies}
          iconName="copy"
          tooltip="Export Cookies"
          borderColor="gray.600"
          borderBottomWidth="1px"
          borderRightWidth="1px"
          size="20px"
          p={3}
        />
        <ActionIcon
          action={openFullPage}
          iconName="settings"
          tooltip="Open settings page"
          borderColor="gray.600"
          borderBottomWidth="1px"
          size="20px"
          p={3}
        />
      </Flex>
    </Flex>
  );
};
