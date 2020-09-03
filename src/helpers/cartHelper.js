import goldenData from '../data/goldenData';

export const getItems = (values) => {
  let gmItems = [];
  let grItems = [];
  if (values.gm !== '0') {
    gmItems = goldenData
      .filter((item) => item.ITEM_TYPE === 'GM' && item.PRICE >= 50)
      .slice(0, Number(values.gm));
  }

  if (values.gr !== '0') {
    grItems = goldenData
      .filter((item) => item.ITEM_TYPE === 'GO' && item.PRICE >= 5)
      .slice(0, Number(values.gr));
  }

  return [...gmItems, ...grItems].map((item) => ({
    offerId: item.OFFERID,
    skuId: item.SKU,
    quantity: 1,
    action: 'ADD',
  }));
};

// item= {
//   offerId: "string",
//   skuId: "string",
//   quantity: "number",
//   action: "ADD",
//   deliveryType?: "GM",
// }

// const updateCartItems = ({
//   postalCode,
//   items,
//   storeId,
//   lang,
//   responseGroup = 'full',
// }) => {
//   const queryStr = queryString({
//     responseGroup,
//     storeId,
//     lang,
//   });
//   return fetchJSON(`/api/cart-page/cart?${queryStr}`, {
//     method: 'POST',
//     body: JSON.stringify({ postalCode, items }),
//   });
// };
// const addItemsToCart = async (items) => {
//   const postalCode = getCookieValue('walmart.shippingPostalCode');
//   const lang = 'en';
//   const storeId = getCookieValue('deliveryCatchment');
//   const items = items.map((item) => ({
//     action: 'ADD',
//     offerId: item.offerId,
//     quantity: 1,
//     skuId: item.skuId,
//   }));
//   // add checked items to cart
//   const res = await updateCartItems({
//     postalCode,
//     items,
//     storeId,
//     lang,
//   });

//   console.log(res);
// };
