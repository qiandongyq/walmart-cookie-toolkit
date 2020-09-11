import * as storage from '../utils/storage';
import { WDT_CUSTOM_COOKIES_POOL } from './constants';

export const getSyncStorageCustomCookiesPool = async () => {
  const data = await storage.getSyncStorage(WDT_CUSTOM_COOKIES_POOL);
  return data ? data[WDT_CUSTOM_COOKIES_POOL] : {};
};

export const initialCustomCookiesPool = async (resetData) => {
  await storage.removeSyncStorage(WDT_CUSTOM_COOKIES_POOL, resetData);
};

export const addCookieToStorage = async (cookie) => {
  const existCustomCookies = await getSyncStorageCustomCookiesPool();
  const hasCustomCookies =
    existCustomCookies !== undefined &&
    Object.keys(existCustomCookies).length > 0;

  let updatedCustomItems = hasCustomCookies
    ? { ...existCustomCookies, [cookie.name]: cookie }
    : { [cookie.name]: cookie };

  await storage.setSyncStorage(WDT_CUSTOM_COOKIES_POOL, updatedCustomItems);
  return cookie;
};

export const deleteCookieFromStorage = async (cookie) => {
  const existCustomCookies = await getSyncStorageCustomCookiesPool();
  const hasCustomCookies =
    existCustomCookies !== undefined &&
    Object.keys(existCustomCookies).length > 0;
  if (hasCustomCookies) {
    delete existCustomCookies[cookie.name];
    await storage.setSyncStorage(WDT_CUSTOM_COOKIES_POOL, existCustomCookies);
  }
};
