import { nanoid } from 'nanoid';
import * as cookieHelper from '../helpers/cookieHelper';
import * as storage from '../utils/storage';
const WALMART_COOKIE_TOOLKIT_PROFILE = 'WALMART_COOKIE_TOOLKIT_PROFILE_ATOM';

export const getLocalStorageProfiles = async () => {
  const data = await storage.getSyncStorage(WALMART_COOKIE_TOOLKIT_PROFILE);
  console.log('data', data);
  return data ? data[WALMART_COOKIE_TOOLKIT_PROFILE] : {};
};

export const addToProfile = async () => {
  const tab = await cookieHelper.getActiveTab();
  console.log('tab', tab);
  const { favIconUrl, title, url } = tab;
  const existProfiles = await getLocalStorageProfiles();
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

  await storage.setSyncStorage(WALMART_COOKIE_TOOLKIT_PROFILE, updatedProfiles);
  console.info('addToProfile helper', newProfile);
  return newProfile;
};

export const updateProfile = async (profile) => {
  const existProfiles = await getLocalStorageProfiles();
  existProfiles[profile.id] = profile;
  await storage.setSyncStorage(WALMART_COOKIE_TOOLKIT_PROFILE, existProfiles);
  console.info('updateProfile helper', existProfiles);
};

export const setDefaultProfile = async (profile) => {
  const existProfiles = await getLocalStorageProfiles();
  console.log('existProfiles', existProfiles);
  for (let key in existProfiles) {
    if (key === profile.id) {
      existProfiles[key].default = true;
    } else {
      existProfiles[key].default = false;
    }
  }
  await storage.setSyncStorage(WALMART_COOKIE_TOOLKIT_PROFILE, existProfiles);
  console.info('setDefaultProfile helper', existProfiles);
};

export const deleteProfile = async (profile) => {
  const existProfiles = await getLocalStorageProfiles();
  if (
    existProfiles[profile.id].default === true &&
    Object.keys(existProfiles).length !== 0
  ) {
    existProfiles[Object.keys(existProfiles)[0]].default = true;
  }
  delete existProfiles[profile.id];
  await storage.setSyncStorage(WALMART_COOKIE_TOOLKIT_PROFILE, existProfiles);
  console.info('deleteProfile helper', existProfiles);
};
