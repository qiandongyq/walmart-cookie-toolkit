const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const VERSION = '1.0.0';

const archive = archiver('zip');
const output = fs.createWriteStream(
  path.join(__dirname, `../walmart-dev-toolkit-${VERSION}.zip`)
);

const zipContents = async () => {
  return new Promise((resolve, reject) => {
    archive
      .directory(path.join(__dirname, '../build'), false)
      .on('error', (err) => reject(err))
      .pipe(output);

    output.on('close', () => {
      console.log(
        `Done! Your file 'walmart-dev-toolkit.zip-${VERSION}' is ready to be uploaded to the web store.`
      );
      resolve();
    });
    archive.finalize();
  });
};

const assemble = async () => {
  console.log('Compressing files...');
  await zipContents();
};

assemble();
