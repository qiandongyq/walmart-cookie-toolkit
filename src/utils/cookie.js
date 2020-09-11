export const formatDocumentCookiesString = (cookies) => {
  return cookies.reduce((acc, curr) => {
    acc += `document.cookie="${curr.name}=${curr.value.replace(
      /"/g,
      '\\"'
    )};path=/";`;
    return acc;
  }, '');
};
