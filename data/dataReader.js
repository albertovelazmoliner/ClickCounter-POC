const fs = require('fs').promises;

const fileReader = async function reader(pathToFile) {
  try {
    const data = await fs.readFile(pathToFile, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

module.exports = {
  fileReader,
};
