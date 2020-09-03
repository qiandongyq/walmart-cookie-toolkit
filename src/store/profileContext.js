import React from 'react';
import { useImmer } from 'use-immer';
import * as profileHelper from '../helpers/profileHelper';

const ProfileContext = React.createContext();

export const ProfileProvider = ({ children }) => {
  const [store, updateStore] = useImmer({
    profiles: {},
    defaultProfile: {},
  });

  React.useEffect(() => {
    const getLocalProfiles = async () => {
      const localProfiles = await profileHelper.getLocalStorageProfiles();
      console.log('localProfiles', localProfiles);
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

  return (
    <ProfileContext.Provider
      value={{
        profiles: Object.keys(store.profiles).map((key) => store.profiles[key]),
        defaultProfile: store.defaultProfile,
        addToProfile,
        updateProfile,
        setDefaultProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileStore = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileState must be used within a ProfileProvider');
  }
  return context;
};
