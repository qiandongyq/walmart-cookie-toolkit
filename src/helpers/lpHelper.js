import * as cookieHelper from './cookieHelper';
import * as tabHelper from './tabHelper';

export const decodeLocalStoreInfoCookie = async () => {
  const tab = await tabHelper.getActiveTab();
  const store = await tabHelper.getStoreByTab(tab);
  const cookie = await cookieHelper.getCookieByStore(
    tab.url,
    'localStoreInfo',
    store.id
  );
  if (cookie.value) {
    const buffer = Buffer.from(cookie.value, 'base64');
    const data = buffer.toString();
    return JSON.parse(data);
  }
  return {};
};
