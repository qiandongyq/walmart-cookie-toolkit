import Cookies from 'js-cookie';

export const decodeLocalStoreInfoCookie = () => {
  const cookie = Cookies.get();
  console.log('cookie', cookie);
  // if (cookie !== undefined) {
  //   console.log('here');
  //   const buffer = Buffer.from(cookie, 'base64');
  //   const data = buffer.toString();
  //   return JSON.parse(data);
  // }
  return {};
};
