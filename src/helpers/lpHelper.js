import * as cookieHelper from './cookieHelper';

export const decodeLocalStoreInfoCookie = async () => {
  const tab = await cookieHelper.getActiveTab();
  const store = await cookieHelper.getStoreByTab(tab);
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
