/* global chrome */
import React from 'react';
import {
  Box,
  Button,
  Heading,
  Flex,
  Icon,
  Collapse,
  PseudoBox,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
} from '@chakra-ui/core';
import { useProfileStore } from '../store';
import { ActionIcon } from '../components';
import { features } from '../config';

const Popup = () => {
  const { addToProfile } = useProfileStore();
  const [show, setShow] = React.useState(false);

  const handleClick = () => {
    // When the icon is clicked, create a new tab pointing to the index page
    // Change this depending on your routes (in this case, the full page is the "/" route)
    chrome.tabs.create({
      url: chrome.extension.getURL('/index.html'),
    });
  };
  const handleToggle = () => setShow(!show);
  const addToProfileHandler = () => addToProfile();

  return (
    <Box w={400}>
      <Stack isInline spacing={2} justify="flex-end" pt="3" pr="3">
        <ActionIcon
          action={addToProfileHandler}
          iconName="plus-square"
          tooltip="add current site to profile"
          size="20px"
        />
        <ActionIcon
          action={handleClick}
          iconName="settings"
          tooltip="Open settings"
          size="20px"
        />
      </Stack>
      <Box px="10" pt="3">
        <Flex align="center" justify="center" mb="5" color="white">
          <Heading size="lg">QA2</Heading>
        </Flex>
        <Button
          size="lg"
          w="100%"
          onClick={addToProfileHandler}
          variantColor="teal"
          variant="outline"
        >
          Import
        </Button>

        <Flex mt="5" mb="3" justify="center" cursor="pointer">
          {show ? (
            <ActionIcon
              action={handleToggle}
              iconName="chevron-up"
              size="20px"
            />
          ) : (
            <ActionIcon
              action={handleToggle}
              iconName="chevron-down"
              size="20px"
            />
          )}
        </Flex>
        <Collapse isOpen={show}>
          <Box my={5}>
            <Tabs variant="enclosed-colored">
              <TabList mb="1em">
                {features.map((f) => (
                  <Tab
                    key={f.name}
                    _selected={{ color: 'white', bg: 'teal.400' }}
                  >
                    {f.name}
                  </Tab>
                ))}
              </TabList>
              <TabPanels mt={5}>
                {features.map((f) => (
                  <TabPanel key={f.name}>
                    <f.component />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Popup;
