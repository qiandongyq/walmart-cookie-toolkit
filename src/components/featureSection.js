import React from 'react';
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels
} from '@chakra-ui/core';
import { ActionIcon } from '../components';
import { FEATURES } from '../config';
import { useCommonSettingsStore } from '../store';
import { COMMON_SETTINGS_TYPE } from '../helpers/constants';

export const FeatureSection = () => {
  const [show, setShow] = React.useState(false);
  const { commonSettings } = useCommonSettingsStore();

  React.useEffect(() => {
    if (commonSettings[COMMON_SETTINGS_TYPE.KEEP_FS_OPEN].isEnabled) {
      setShow(true);
    }
  }, [commonSettings]);

  const handleToggle = () => setShow((prev) => !prev);

  return (
    <Box>
      <Flex mt="5" mb="3" wrap="wrap" justify="center" cursor="pointer">
        {show ? (
          <ActionIcon action={handleToggle} iconName="chevron-up" size="20px" />
        ) : (
          <ActionIcon
            action={handleToggle}
            iconName="chevron-down"
            size="20px"
          />
        )}
      </Flex>
      {show && (
        <Box my={5}>
          <Tabs isFitted variant="enclosed-colored">
            <TabList mb={1}>
              {FEATURES.map((f) => (
                <Tab
                  key={f.name}
                  _selected={{ color: 'white', bg: 'teal.400' }}
                >
                  {f.name}
                </Tab>
              ))}
            </TabList>
            <TabPanels mt={5}>
              {FEATURES.map((f) => (
                <TabPanel key={f.name}>
                  <f.component />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Box>
  );
};
