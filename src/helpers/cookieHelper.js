/*global chrome*/
import * as tabHelper from './tabHelper';

export const getAllCookiesByStore = (url, storeId) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ url, storeId }, (cookies) => {
      if (!cookies) {
        return reject(`${url} is invaild url`);
      }
      if (cookies.length === 0) {
        return reject(`No cookies found`);
      }
      resolve(cookies);
    });
  });
};

export const getCookieByStore = (url, name, storeId) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url, storeId, name }, (cookie) => {
      if (!cookie) {
        return reject(`${url} is invaild url`);
      }
      if (cookie.length === 0) {
        return reject(`No cookies found`);
      }
      resolve(cookie);
    });
  });
};

export const setCookie = (cookie, url, storeId) => {
  return new Promise((resolve) => {
    chrome.cookies.set({
      url,
      storeId,
      path: '/',
      name: cookie.name,
      value: cookie.value,
      sameSite: cookie.sameSite,
      expirationDate: cookie.expirationDate,
      secure: cookie.secure
    });

    resolve();
  });
};

export const addCookie = (activeTab, activeStore, cookie) => {
  return new Promise((resolve) => {
    chrome.cookies.set({
      url: activeTab.url,
      storeId: activeStore.id,
      path: '/',
      name: cookie.name,
      value: cookie.value,
      sameSite: cookie.sameSite,
      expirationDate: cookie.expirationDate,
      secure: cookie.secure
    });

    resolve();
  });
};

export const removeCookie = (url, storeId, name) => {
  return new Promise((resolve) => {
    chrome.cookies.remove({
      url,
      storeId,
      name
    });
    resolve();
  });
};

export const deleteAllCookies = async (NORMAL_MODE_STORE) => {
  const activeTab = await tabHelper.getActiveTab();
  const allCookies = await getAllCookiesByStore(
    activeTab.url,
    NORMAL_MODE_STORE
  );
  for (const cookie of allCookies) {
    await removeCookie(activeTab.url, NORMAL_MODE_STORE, cookie.name);
  }
  return allCookies;
};

export const importAllCookies = async (
  url,
  NORMAL_MODE_STORE,
  customCookies = {}
) => {
  const allCookies = await getAllCookiesByStore(url, NORMAL_MODE_STORE);
  if (Object.keys(customCookies).length > 0) {
    Object.keys(customCookies).forEach((key) => {
      allCookies.push({ ...allCookies[0], ...customCookies[key] });
    });
  }
  const activeTab = await tabHelper.getActiveTab();
  for (const cookie of allCookies) {
    await setCookie(cookie, activeTab.url, NORMAL_MODE_STORE);
  }
  return allCookies;
};
