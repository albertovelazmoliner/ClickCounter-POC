const fs = require('fs');

async function reader(pathToFile, callback) {
  fs.readFile(pathToFile, (err, data) => {
    const bufferString = data.toString();
    const fileData = JSON.parse(bufferString);
    callback(fileData);
  });
}

const fileReader = async (pathToFile, callback) => reader(pathToFile, callback);

const fileReaderSync = (pathToFile) => {
  const result = fs.readFileSync(pathToFile, 'utf8');
  return result;
};

module.exports = {
  fileReader,
  fileReaderSync,
};
