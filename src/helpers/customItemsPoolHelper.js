import * as storage from '../utils/storage';
import { WDT_CUSTOM_ITEMS_POOL } from './constants';

export const getSyncStorageCustomItemsPool = async () => {
  const data = await storage.getSyncStorage(WDT_CUSTOM_ITEMS_POOL);
  return data ? data[WDT_CUSTOM_ITEMS_POOL] : {};
};

export const initialCustomItemsPool = async (customItems) => {
  await storage.removeSyncStorage(WDT_CUSTOM_ITEMS_POOL, customItems);
};

export const addItemToStorage = async (item) => {
  const existCustomItems = await getSyncStorageCustomItemsPool();
  const hasCustomItems =
    existCustomItems !== undefined && Object.keys(existCustomItems).length > 0;

  let updatedCustomItems = hasCustomItems
    ? { ...existCustomItems, [item.SKU]: item }
    : { [item.SKU]: item };

  await storage.setSyncStorage(WDT_CUSTOM_ITEMS_POOL, updatedCustomItems);
  return item;
};

export const deleteItemFromStorage = async (item) => {
  const existCustomItems = await getSyncStorageCustomItemsPool();
  const hasCustomItems =
    existCustomItems !== undefined && Object.keys(existCustomItems).length > 0;
  if (hasCustomItems) {
    delete existCustomItems[item.SKU];
    await storage.setSyncStorage(WDT_CUSTOM_ITEMS_POOL, existCustomItems);
  }
};
