const path = require('path');
const { fileReader } = require('../data/dataReader');
const { writeData } = require('../data/dataWriter');
const { clickIsValid } = require('../utlis/dataValidator');
const {
  clickDataToArray,
  getClickDay,
  getClickPeriod,
} = require('../utlis/utils');
const IPController = require('../utlis/IPController');

const preData = new Map();

const addToList = (element) => {
  const clickPeriod = getClickPeriod(element.timestamp);
  const clickDay = getClickDay(element.timestamp);
  const key = `${element.ip}-${clickDay}-${clickPeriod}`;

  if (preData.has(key)) {
    const clickInPreData = preData.get(key);
    /* Check if the amount is greater for the same day and period */
    if (clickInPreData.amount < element.amount) {
      preData.set(key, element);
    } else if (clickInPreData.amount === element.amount) {
      const unixTimestampInPreData = new Date(
        clickInPreData.timestamp,
      ).getSeconds();
      const unixTimestampElement = new Date(element.timestamp).getSeconds();
      /* Check if the click happened before than the current click on a day and period when the amount is equal */
      if (unixTimestampElement > unixTimestampInPreData) {
        preData.set(key, element);
      }
    }
  } else {
    preData.set(key, element);
  }
};

const dataProcessor = (data, ipController) => {
  data.forEach((element) => {
    if (clickIsValid(element)) {
      ipController.counterControl(element);
      addToList(element);
    }
  });

  const arrayData = clickDataToArray(preData);
  const result = ipController.cleanRepeatedMoreThan10Times(arrayData);
  return result;
};

const processData = async (file) => {
  preData.clear();
  const fileDir = path.join(__dirname, file);
  console.log(`[DataProcessor] Start processing data from ${fileDir}`);
  const ipController = new IPController();
  const data = await fileReader(fileDir);
  const result = dataProcessor(data, ipController);
  await writeData(result);
};

module.exports = {
  processData,
};
