/*global chrome*/
import { QA_BASE_URL } from './constants';
import { getUrlFromEnv } from '../utils/url';

export const getActiveTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};

export const getStoreByTab = (tab) => {
  return new Promise((resolve) => {
    chrome.cookies.getAllCookieStores((cookieStores) => {
      const store = cookieStores.find((store) => store.tabIds.includes(tab.id));
      resolve(store);
    });
  });
};

export const reloadActivePage = async () => {
  const tab = await getActiveTab();
  return new Promise((resolve) => {
    chrome.tabs.reload(tab.id, {}, () => {
      resolve();
    });
  });
};

export const redirectToCheckout = async (env = QA_BASE_URL) => {
  const baseApiUrl = getUrlFromEnv(env);
  const appUrl = `${baseApiUrl}/checkout`;
  const tab = await getActiveTab();
  return new Promise((resolve) => {
    chrome.tabs.update(tab.id, { url: appUrl }, () => {
      resolve();
    });
  });
};
