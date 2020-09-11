import * as storage from '../utils/storage';
import { WDT_COMMON_SETTINGS } from './constants';

export const getSyncStorageCommonSettings = async () => {
  const data = await storage.getSyncStorage(WDT_COMMON_SETTINGS);
  return data ? data[WDT_COMMON_SETTINGS] : {};
};

export const initialCommonSettings = async (commonSettings) => {
  await storage.setSyncStorage(WDT_COMMON_SETTINGS, commonSettings);
};

export const updateCommonSettings = async (setting) => {
  let existCommonSettings = await getSyncStorageCommonSettings();
  if (!existCommonSettings) {
    existCommonSettings = {};
  }

  existCommonSettings[setting.name] = setting;
  await storage.setSyncStorage(WDT_COMMON_SETTINGS, existCommonSettings);
};
