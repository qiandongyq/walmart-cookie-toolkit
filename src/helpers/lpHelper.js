import * as cookieHelper from './cookieHelper';

export const decodeLocalStoreInfoCookie = async () => {
  const tab = await cookieHelper.getActiveTab();
  console.log('tab', tab);
  const store = await cookieHelper.getStoreByTab(tab);
  console.log('store', store);
  const cookie = await cookieHelper.getCookieByStore(
    tab.url,
    'localStoreInfo',
    store.id
  );
  if (cookie) {
    const buffer = Buffer.from(cookie, 'base64');
    const data = buffer.toString();
    return JSON.parse(data);
  }
  return {};
};
