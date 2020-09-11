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

export const redirectToCheckout = async () => {
  const tab = await getActiveTab();
  const redirectUrl = tab.url.match(
    /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)(:[\d?]+)?/
  )[0];

  const appUrl = tab.url.includes('checkout')
    ? tab.url
    : `${redirectUrl}/checkout`;
  return new Promise((resolve) => {
    chrome.tabs.update(tab.id, { url: appUrl }, () => {
      resolve();
    });
  });
};
