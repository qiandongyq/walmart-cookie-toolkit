/* global chrome */
import React from 'react';
import { Stack, useToast } from '@chakra-ui/core';
import { ActionIcon } from '../../components';
import { useProfileStore } from '../../store';

export const HeaderActions = () => {
  const { addToProfile } = useProfileStore();
  const toast = useToast();
  const openFullPage = () => {
    // When the icon is clicked, create a new tab pointing to the index page
    // Change this depending on your routes (in this case, the full page is the "/" route)
    chrome.tabs.create({
      url: chrome.extension.getURL('/index.html')
    });
  };

  const handleAddProfile = async () => {
    try {
      const newProfile = await addToProfile();
      console.log('newProfile', newProfile);
      toast({
        title: `Success`,
        description: `<${newProfile.title.slice(
          0,
          10
        )}...> added to your profile`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom'
      });
    } catch (err) {
      console.log(err);
      toast({
        title: `An error occurred.`,
        description: `Unable add to your profile`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };
  return (
    <Stack isInline spacing={2} justify="flex-end" pt="3" pr="3">
      <ActionIcon
        action={handleAddProfile}
        iconName="plus-square"
        tooltip="add current site to profile"
        size="20px"
      />
      <ActionIcon
        action={openFullPage}
        iconName="settings"
        tooltip="Open settings"
        size="20px"
      />
    </Stack>
  );
};
