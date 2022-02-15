const fs = require('fs');

async function reader(pathToFile, callback) {
  fs.readFile(pathToFile, (err, data) => {
    if (err) {
      throw err;
    }
    const bufferString = data.toString();
    const fileData = JSON.parse(bufferString);
    callback(fileData);
  });
}

const fileReader = async (pathToFile, callback) => reader(pathToFile, callback);

const fileReaderSync = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf8');
  const readData = JSON.parse(data);
  return readData;
};

module.exports = {
  fileReader,
  fileReaderSync,
};
