/* global chrome */
export const getActiveTab = (keys = []) => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true }, (tab) => {
      resolve(tab[0]);
    });
  });
};
