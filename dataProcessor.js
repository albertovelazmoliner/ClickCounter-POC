const path = require('path');
const { fileReaderSync } = require('./data/dataReader');
const { writeData } = require('./data/dataWriter');
const { clickIsValid } = require('./utlis/dataValidator');
const { FILE_DATA_CLICK } = require('./common/constants');
const { clickDataToArray, getClickDay, getClickPeriod } = require('./utlis/utils');
const IPController = require('./utlis/IPController');

const preData = new Map();
const fileDir = path.join(__dirname, FILE_DATA_CLICK);
const ipController = new IPController();

const readData = () => JSON.parse(fileReaderSync(fileDir));

const addToList = (element) => {
  const clickPeriod = getClickPeriod(element.timestamp);
  const clickDay = getClickDay(element.timestamp);
  const key = `${element.ip}-${clickDay}-${clickPeriod}`;
  if (preData.has(key)) {
    const clickInPreData = preData.get(key);
    if (clickInPreData.amount < element.amount) {
      preData.set(key, element);
    } else if (clickInPreData.amount === element.amount) {
      const unixTimestampInPreData = new Date(
        clickInPreData.timestamp,
      ).getSeconds();
      const unixTimestampElement = new Date(element.timestamp).getSeconds();
      if (unixTimestampElement > unixTimestampInPreData) {
        preData.set(key, element);
      }
    }
  } else {
    preData.set(key, element);
  }
};

const cleanRepeatedMoreThan10Times = (arrayData) => {
  const bannedIPs = ipController.getBannedIPs();
  const result = arrayData.filter((element) => !bannedIPs.includes(element.ip));
  return result;
};

const processData = () => {
  const data = readData();
  data.forEach((element) => {
    if (clickIsValid(element)) {
      ipController.counterControl(element);
      addToList(element);
    }
  });

  const arrayData = clickDataToArray(preData);
  const result = cleanRepeatedMoreThan10Times(arrayData);

  writeData(result);
};

module.exports = processData;
