export const exportToDownload = (json) => {
  const filename = 'WDT_RESTORE_FILE.json';
  const jsonStr = JSON.stringify(json);

  let element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr)
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
