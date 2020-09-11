import React from 'react';
import { useImmer } from 'use-immer';
import * as commonSettingsHelper from '../helpers/commonSettingsHelper';
import commonSettings from '../data/commonSettings';

const CommonSettingsContext = React.createContext();

export const CommonSettingsProvider = ({ children }) => {
  const [store, updateStore] = useImmer({
    commonSettings
  });

  React.useEffect(() => {
    const getLocalCustomSettings = async () => {
      const localCommonSettings = await commonSettingsHelper.getSyncStorageCommonSettings();
      if (localCommonSettings) {
        updateStore((draft) => {
          draft.commonSettings = localCommonSettings;
        });
      } else {
        await commonSettingsHelper.initialCommonSettings(commonSettings);
      }
    };
    getLocalCustomSettings();
  }, [updateStore]);

  const updateCommonSettingsToStore = async (setting) => {
    await commonSettingsHelper.updateCommonSettings(setting);
    updateStore((draft) => {
      draft.commonSettings[setting.name] = setting;
    });
  };

  const resetCommonSettings = async (resetData) => {
    if (resetData) {
      await commonSettingsHelper.initialCommonSettings(resetData);
      updateStore((draft) => {
        draft.commonSettings = resetData;
      });
    } else {
      await commonSettingsHelper.initialCommonSettings(commonSettings);
      updateStore((draft) => {
        draft.commonSettings = commonSettings;
      });
    }
  };

  return (
    <CommonSettingsContext.Provider
      value={{
        commonSettings: store.commonSettings,
        updateCommonSetting: updateCommonSettingsToStore,
        resetCommonSettings
      }}
    >
      {children}
    </CommonSettingsContext.Provider>
  );
};

export const useCommonSettingsStore = () => {
  const context = React.useContext(CommonSettingsContext);
  if (context === undefined) {
    throw new Error(
      'useCommonSettingsStore must be used within a CommonSettingsProvider'
    );
  }
  return context;
};
