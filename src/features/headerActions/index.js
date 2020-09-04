/* global chrome */
import React from 'react';
import { Stack } from '@chakra-ui/core';
import { ActionIcon } from '../../components';
import { useProfileStore } from '../../store';

export const HeaderActions = () => {
  const { addToProfile } = useProfileStore();
  const openFullPage = () => {
    // When the icon is clicked, create a new tab pointing to the index page
    // Change this depending on your routes (in this case, the full page is the "/" route)
    chrome.tabs.create({
      url: chrome.extension.getURL('/index.html'),
    });
  };
  return (
    <Stack isInline spacing={2} justify="flex-end" pt="3" pr="3">
      <ActionIcon
        action={addToProfile}
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
