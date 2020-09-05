import axios from 'axios';
import Cookies from 'js-cookie';
import goldenData from '../data/goldenData';

const QA_API_BASE_URL = 'https://www-qa2.walmart.ca/api/cart-page';
const STG_API_BASE_URL = 'https://www-qa3.walmart.ca/api/cart-page';

export const getItems = (values, searchedItem = {}) => {
  let itemFromSearch = [];
  let skuItems = [];
  let gmItems = [];
  let gm3pItems = [];
  let gmDigitalItems = [];
  let gmOsItems = [];
  let gmLsItems = [];
  let goItems = [];

  // Search item
  if (Object.keys(searchedItem).length !== 0) {
    itemFromSearch.push(searchedItem);
  }

  if (values.skuId) {
    //Sku id
    skuItems = goldenData.filter((item) => item.SKU === Number(values.skuId));
  }

  //GM items
  if (values.gmCount !== '0') {
    gmItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GM' &&
          item.OFFERTYPE === '1P' &&
          !item.ISDIGITAL &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= Number(values.gmPrice)
      )
      .slice(0, Number(values.gmCount));
  }

  // GM 3p items
  if (values.gm3pCount !== '0') {
    gm3pItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GM' &&
          item.OFFERTYPE === '3P' &&
          !item.ISDIGITAL &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= Number(values.gmPrice)
      )
      .slice(0, Number(values.gm3pCount));
  }

  // GM digital items
  if (values.gmDigitalCount !== '0') {
    gmDigitalItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GM' &&
          item.OFFERTYPE === '1P' &&
          item.ISDIGITAL &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= Number(values.gmPrice)
      )
      .slice(0, Number(values.gmDigitalCount));
  }

  //GM LS items
  if (values.gmLsCount !== '0') {
    gmLsItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GM' && item.LIMITEDSTOCKAVAILABLE === 'YES'
      )
      .slice(0, Number(values.gmLsCount));
  }
  //GM OOS items
  if (values.gmOsCount !== '0') {
    gmOsItems = goldenData
      .filter((item) => item.ITEM_TYPE === 'GM' && item.INVENTORY === 0)
      .slice(0, Number(values.gmOsCount));
  }

  // GO items
  if (values.goCount !== '0') {
    goItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GO' &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= Number(values.goPrice)
      )
      .slice(0, Number(values.goCount));
  }

  return [
    ...itemFromSearch,
    ...skuItems,
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
  env = QA_API_BASE_URL
}) => {
  const apiUrl = env === 'QA' ? QA_API_BASE_URL : STG_API_BASE_URL;
  await axios.post(
    `${apiUrl}/cart?responseGroup=full&storeId=${storeId}&lang=en`,
    {
      postalCode,
      items
    }
  );
};

export const addItemsToCart = async (items, env) => {
  const postalCode = Cookies.get('walmart.shippingPostalCode');
  const storeId = Cookies.get('deliveryCatchment');
  await updateCartItems({
    postalCode,
    items,
    storeId,
    env
  });
};
