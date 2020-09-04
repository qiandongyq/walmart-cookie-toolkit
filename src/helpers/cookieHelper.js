/*global chrome*/
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

export const getActiveTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};

export const setCookie = (cookie, activeTab, activeStore) => {
  return new Promise((resolve, reject) => {
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

export const addCookie = (activeTab, activeStore, cookie) => {
  return new Promise((resolve, reject) => {
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

export const getStoreByTab = (tab) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAllCookieStores((cookieStores) => {
      const store = cookieStores.find((store) => store.tabIds.includes(tab.id));
      resolve(store);
    });
  });
};

export const removeCookie = (activeTab, activeStore, cookie) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.remove({
      url: activeTab.url,
      storeId: activeStore.id,
      name: cookie.name
    });
    resolve();
  });
};
