import axios from 'axios';
import goldenData from '../data/goldenData';
import { QA_BASE_URL, CHROME_STORE_ID } from './constants';
import * as cookieHelper from './cookieHelper';
import { getUrlFromEnv } from '../utils/url';

const getGeneralItemsInCategory = (itemCount, customItemsArray, options) => {
  let lookupItems = [];
  if (itemCount !== 0) {
    lookupItems = customItemsArray
      .filter(
        (item) =>
          item.ITEM_TYPE === options.itemType &&
          item.OFFERTYPE === options.offerType &&
          !item.ISDIGITAL &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= options.price
      )
      .slice(0, itemCount);

    if (lookupItems.length < itemCount) {
      const remainItems = goldenData
        .filter(
          (item) =>
            item.ITEM_TYPE === options.itemType &&
            item.OFFERTYPE === options.offerType &&
            !item.ISDIGITAL &&
            item.LIMITEDSTOCKAVAILABLE === 'NO' &&
            item.INVENTORY !== 0 &&
            item.PRICE >= options.price
        )
        .slice(0, itemCount - lookupItems.length);
      lookupItems = [...lookupItems, ...remainItems];
    }
  }
  return lookupItems;
};

export const getItems = (values, searchedItem = {}, customItems = {}) => {
  let itemFromSearch = [];
  let gmItems = [];
  let gm3pItems = [];
  let gmDigitalItems = [];
  let gmOsItems = [];
  let gmLsItems = [];
  let goItems = [];

  const customItemsArray = Object.keys(customItems).map(
    (key) => customItems[key]
  );

  // Search item
  if (Object.keys(searchedItem).length !== 0) {
    itemFromSearch.push(searchedItem);
  }

  //GM items
  gmItems = getGeneralItemsInCategory(values.gmCount, customItemsArray, {
    itemType: 'GM',
    offerType: '1P',
    price: values.gmPrice
  });

  // GM 3p items
  gm3pItems = getGeneralItemsInCategory(values.gm3pCount, customItemsArray, {
    itemType: 'GM',
    offerType: '3P',
    price: values.gmPrice
  });

  // GM digital items
  if (values.gmDigitalCount !== 0) {
    gmDigitalItems = customItemsArray
      .filter((item) => item.ISDIGITAL && item.INVENTORY !== 0)
      .slice(0, values.gmDigitalCount);

    if (gmDigitalItems.length < values.gmDigitalCount) {
      const remainItems = goldenData
        .filter((item) => item.ISDIGITAL && item.INVENTORY !== 0)
        .slice(0, values.gmDigitalCount - gmDigitalItems.length);
      gmDigitalItems = [...gmDigitalItems, ...remainItems];
    }
  }

  //GM LS items
  if (values.gmLsCount !== 0) {
    gmLsItems = customItemsArray
      .filter(
        (item) => item.LIMITEDSTOCKAVAILABLE === 'YES' && item.INVENTORY !== 0
      )
      .slice(0, values.gmLsCount);

    if (gmLsItems.length < values.gmLsCount) {
      const remainItems = goldenData
        .filter(
          (item) => item.LIMITEDSTOCKAVAILABLE === 'YES' && item.INVENTORY !== 0
        )
        .slice(0, values.gmLsCount - gmLsItems.length);
      gmLsItems = [...gmLsItems, ...remainItems];
    }
  }

  //GM OOS items
  if (values.gmOsCount !== 0) {
    gmOsItems = customItemsArray
      .filter((item) => item.INVENTORY === 0)
      .slice(0, values.gmOsCount);

    if (gmOsItems.length < values.gmOsCount) {
      const remainItems = goldenData
        .filter((item) => item.INVENTORY === 0)
        .slice(0, values.gmOsCount - gmOsItems.length);
      gmOsItems = [...gmLsItems, ...remainItems];
    }
  }

  // GO items
  if (values.goCount !== 0) {
    goItems = customItemsArray
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GO' &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= values.goPrice
      )
      .slice(0, values.goCount);

    if (goItems.length < values.goCount) {
      const remainItems = goldenData
        .filter(
          (item) =>
            item.ITEM_TYPE === 'GO' &&
            item.LIMITEDSTOCKAVAILABLE === 'NO' &&
            item.INVENTORY !== 0 &&
            item.PRICE >= values.goPrice
        )
        .slice(0, values.goCount - goItems.length);
      gmOsItems = [...goItems, ...remainItems];
    }
  }

  return [
    ...itemFromSearch,
    ...gmItems,
    ...gm3pItems,
    ...gmDigitalItems,
    ...gmLsItems,
    ...gmOsItems,
    ...goItems
  ].map((item) => ({
    offerId: item.OFFERID,
    skuId: item.SKU,
    quantity: 1,
    action: 'ADD'
  }));
};

const updateCartItems = async ({
  postalCode = 'K1C1T1',
  items,
  storeId = '5540',
  env = QA_BASE_URL
}) => {
  const baseApiUrl = getUrlFromEnv(env);
  const apiUrl = `${baseApiUrl}/api/cart-page`;
  await axios.post(
    `${apiUrl}/cart?responseGroup=full&storeId=${storeId}&lang=en`,
    {
      postalCode,
      items
    }
  );
};

export const addItemsToCart = async (items, env = QA_BASE_URL) => {
  const { value: postalCode } = await cookieHelper.getCookieByStore(
    getUrlFromEnv(env),
    'walmart.shippingPostalCode',
    CHROME_STORE_ID.NORMAL_MODE_STORE
  );
  const { value: storeId } = await cookieHelper.getCookieByStore(
    getUrlFromEnv(env),
    'deliveryCatchment',
    CHROME_STORE_ID.NORMAL_MODE_STORE
  );
  await updateCartItems({
    postalCode,
    items,
    storeId,
    env
  });
};
