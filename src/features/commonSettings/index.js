import React from 'react';
import {
  Box,
  useToast,
  Flex,
  Checkbox,
  Tooltip,
  PseudoBox
} from '@chakra-ui/core';
import { useCommonSettingsStore } from '../../store';
import { COMMON_SETTINGS_TYPE } from '../../helpers/constants';

export const CommonSettings = () => {
  const { commonSettings, updateCommonSetting } = useCommonSettingsStore();
  const toast = useToast();
  const handleSettingChange = async (e, setting) => {
    const isChecked = e.target.checked;
    try {
      const autoRTCOnImport =
        commonSettings[COMMON_SETTINGS_TYPE.RTC_ON_IMPORT];
      const autoRTCOnAdd = commonSettings[COMMON_SETTINGS_TYPE.RTC_ON_ADD];
      if (
        (setting.name === autoRTCOnImport.name && !autoRTCOnImport.isEnabled) ||
        (setting.name === autoRTCOnAdd.name && !autoRTCOnAdd.isEnabled)
      ) {
        await updateCommonSetting({
          ...commonSettings[COMMON_SETTINGS_TYPE.AUTO_REFRESH],
          isEnabled: false
        });
      }
      await updateCommonSetting({
        ...setting,
        isEnabled: isChecked
      });
      toast({
        title: `Success`,
        description: `${
          setting.name
        } is set to ${isChecked.toString().toUpperCase()}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
    } catch (e) {
      toast({
        title: `An error occurred.`,
        description: `Unable to change settings`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
    }
  };

  const isDisableAutoRefresh = (setting) =>
    setting.name === COMMON_SETTINGS_TYPE.AUTO_REFRESH &&
    (commonSettings[COMMON_SETTINGS_TYPE.RTC_ON_ADD].isEnabled ||
      commonSettings[COMMON_SETTINGS_TYPE.RTC_ON_IMPORT].isEnabled);

  return (
    <Flex flexWrap="wrap">
      {Object.keys(commonSettings).map((key) => {
        const setting = commonSettings[key];
        return (
          <Box key={key} mt={3} mr={4}>
            <Checkbox
              variantColor="teal"
              isChecked={setting.isEnabled}
              onChange={(e) => handleSettingChange(e, setting)}
              isDisabled={isDisableAutoRefresh(setting)}
            >
              <Tooltip label={setting.desc} placement="top">
                <PseudoBox
                  _hover={{
                    textShadow: '0 2px 8px rgba(54, 230, 180,0.5)'
                  }}
                >
                  {setting.name}
                </PseudoBox>
              </Tooltip>
            </Checkbox>
          </Box>
        );
      })}
    </Flex>
  );
};
