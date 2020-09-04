import axios from 'axios';
import Cookies from 'js-cookie';
import goldenData from '../data/goldenData';

const QA_API_BASE_URL = 'https://www-qa2.walmart.ca/api/cart-page';
const STG_API_BASE_URL = 'https://www-qa3.walmart.ca/api/cart-page';

export const getItems = (values) => {
  let skuItems = [];
  let gmItems = [];
  let gmOsItems = [];
  let gmLsItems = [];
  let goItems = [];
  let goOsItems = [];
  let goLsItems = [];

  //Sku id
  if (values.skuId) {
    skuItems = goldenData.filter((item) => item.SKU === Number(values.skuId));
  }

  //GM items
  if (values.gmCount !== '0') {
    gmItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GM' &&
          item.LIMITEDSTOCKAVAILABLE === 'NO' &&
          item.INVENTORY !== 0 &&
          item.PRICE >= Number(values.gmPrice)
      )
      .slice(0, Number(values.gmCount));
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
      .slice(0, Number(values.gmCount));
  }
  // GO LS items
  if (values.goLsCount !== '0') {
    goLsItems = goldenData
      .filter(
        (item) =>
          item.ITEM_TYPE === 'GO' && item.LIMITEDSTOCKAVAILABLE === 'YES'
      )
      .slice(0, Number(values.goLsCount));
  }
  // GO OOS items
  if (values.goOsItems !== '0') {
    goOsItems = goldenData
      .filter((item) => item.ITEM_TYPE === 'GM' && item.INVENTORY === 0)
      .slice(0, Number(values.goOsItems));
  }

  return [
    ...skuItems,
    ...gmItems,
    ...gmLsItems,
    ...gmOsItems,
    ...goItems,
    ...goLsItems,
    ...goOsItems,
  ].map((item) => ({
    offerId: item.OFFERID.toString(),
    skuId: item.SKU.toString(),
    quantity: 1,
    action: 'ADD',
  }));
};

const updateCartItems = ({
  postalCode = 'K1C1T1',
  items,
  storeId = '5540',
  env = QA_API_BASE_URL,
}) => {
  const apiUrl = env === 'QA' ? QA_API_BASE_URL : STG_API_BASE_URL;
  console.log(apiUrl);
  axios.post(`${apiUrl}/cart?responseGroup=full&storeId=${storeId}&lang=en`, {
    postalCode,
    items,
  });
};

export const addItemsToCart = async (items, env) => {
  const postalCode = Cookies.get('walmart.shippingPostalCode');
  const storeId = Cookies.get('deliveryCatchment');
  try {
    await updateCartItems({
      postalCode,
      items,
      storeId,
      env,
    });
  } catch (err) {
    console.log(err);
  }
};
