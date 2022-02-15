const fs = require('fs').promises;

const writeData = async (data) => {
  try {
    await fs.writeFile('result​set.json', JSON.stringify(data), { encoding: 'utf-8' });
    // eslint-disable-next-line no-console
    console.log('JSON data is saved.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

module.exports = {
  writeData,
};
