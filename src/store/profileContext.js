import React from 'react';
import { useImmer } from 'use-immer';
import * as profileHelper from '../helpers/profileHelper';
import defaultProfiles from '../data/defaultProfiles';

const ProfileContext = React.createContext();

export const ProfileProvider = ({ children }) => {
  const [store, updateStore] = useImmer({
    profiles: {},
    defaultProfile: {}
  });

  React.useEffect(() => {
    const getLocalProfiles = async () => {
      const localProfiles = await profileHelper.getSyncStorageProfiles();
      if (localProfiles) {
        updateStore((draft) => {
          draft.profiles = localProfiles;
          for (let key in draft.profiles) {
            if (draft.profiles[key].default) {
              draft.defaultProfile = draft.profiles[key];
              break;
            }
          }
        });
      } else {
        await profileHelper.initialProfiles(defaultProfiles);
      }
    };
    getLocalProfiles();
  }, [updateStore]);

  const addToProfile = async () => {
    const newProfile = await profileHelper.addToProfile();
    updateStore((draft) => {
      draft.profiles[newProfile.id] = newProfile;
      if (Object.keys(draft.profiles).length === 0) {
        draft.profiles[newProfile.id].default = true;
      }
    });
    return newProfile;
  };

  const updateProfile = async (profile) => {
    await profileHelper.updateProfile(profile);
    updateStore((draft) => {
      draft.profiles[profile.id] = profile;
    });
  };

  const setDefaultProfile = async (profile) => {
    await profileHelper.setDefaultProfile(profile);
    updateStore((draft) => {
      for (let key in draft.profiles) {
        if (draft.profiles[key].default === true && key !== profile.id) {
          draft.profiles[key].default = false;
        }
      }
      draft.profiles[profile.id].default = true;
      draft.defaultProfile = profile;
    });
  };

  const deleteProfile = async (profile) => {
    await profileHelper.deleteProfile(profile);
    updateStore((draft) => {
      if (
        Object.keys(draft.profiles).length !== 0 &&
        draft.profiles[profile.id].default === true
      ) {
        draft.profiles[Object.keys(draft.profiles)[0]].default = true;
      }
      delete draft.profiles[profile.id];
    });
  };

  const resetProfiles = async (resetData) => {
    if (resetData) {
      await profileHelper.initialProfiles(resetData);
      updateStore((draft) => {
        draft.profiles = resetData;
      });
    } else {
      await profileHelper.initialProfiles(defaultProfiles);
      updateStore((draft) => {
        draft.profiles = defaultProfiles;
      });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles: Object.keys(store.profiles).map((key) => store.profiles[key]),
        defaultProfile: store.defaultProfile,
        addToProfile,
        updateProfile,
        setDefaultProfile,
        deleteProfile,
        resetProfiles
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileStore = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileStore must be used within a ProfileProvider');
  }
  return context;
};
