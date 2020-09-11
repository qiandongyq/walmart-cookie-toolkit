import { nanoid } from 'nanoid';
import * as tabHelper from '../helpers/tabHelper';
import * as storage from '../utils/storage';
import { WDT_COOKIE_PROFILE } from './constants';

export const getSyncStorageProfiles = async () => {
  const data = await storage.getSyncStorage(WDT_COOKIE_PROFILE);
  return data ? data[WDT_COOKIE_PROFILE] : {};
};

export const initialProfiles = async (defaultProfiles) => {
  await storage.setSyncStorage(WDT_COOKIE_PROFILE, defaultProfiles);
};

export const addToProfile = async () => {
  const tab = await tabHelper.getActiveTab();
  const { favIconUrl, title, url } = tab;
  const existProfiles = await getSyncStorageProfiles();
  const hasProfile =
    existProfiles !== undefined && Object.keys(existProfiles).length > 0;
  const newProfile = {
    id: nanoid(),
    favIconUrl,
    title: title.length > 35 ? title.slice(0, 35) : title,
    url,
    default: hasProfile ? false : true
  };
  let updatedProfiles = hasProfile
    ? { ...existProfiles, [newProfile.id]: newProfile }
    : { [newProfile.id]: newProfile };

  await storage.setSyncStorage(WDT_COOKIE_PROFILE, updatedProfiles);
  return newProfile;
};

export const updateProfile = async (profile) => {
  const existProfiles = await getSyncStorageProfiles();
  existProfiles[profile.id] = profile;
  await storage.setSyncStorage(WDT_COOKIE_PROFILE, existProfiles);
};

export const setDefaultProfile = async (profile) => {
  const existProfiles = await getSyncStorageProfiles();
  for (let key in existProfiles) {
    if (key === profile.id) {
      existProfiles[key].default = true;
    } else {
      existProfiles[key].default = false;
    }
  }
  await storage.setSyncStorage(WDT_COOKIE_PROFILE, existProfiles);
};

export const deleteProfile = async (profile) => {
  const existProfiles = await getSyncStorageProfiles();
  if (
    existProfiles[profile.id].default === true &&
    Object.keys(existProfiles).length !== 0
  ) {
    existProfiles[Object.keys(existProfiles)[0]].default = true;
  }
  delete existProfiles[profile.id];
  await storage.setSyncStorage(WDT_COOKIE_PROFILE, existProfiles);
};
