const fs = require('fs');

const writeData = (data) => {
  fs.writeFile('result​set.json', JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data is saved.');
  });
};

module.exports = {
  writeData,
};
