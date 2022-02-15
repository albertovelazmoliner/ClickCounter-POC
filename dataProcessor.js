const path = require('path');
const { fileReader, fileReaderSync } = require('./data/dataReader');
const { writeData } = require('./data/dataWriter');
const { clickIsValid } = require('./utlis/dataValidator');
const { FILE_DATA_CLICK } = require('./common/constants');
const { clickDataToArray, getClickDay, getClickPeriod } = require('./utlis/utils');
const IPController = require('./utlis/IPController');

const fileDir = path.join(__dirname, FILE_DATA_CLICK);
const preData = new Map();
const ipController = new IPController();

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

const mainProcess = (data) => {
  data.forEach((element) => {
    if (clickIsValid(element)) {
      ipController.counterControl(element);
      addToList(element);
    }
  });

  const arrayData = clickDataToArray(preData);
  const result = ipController.cleanRepeatedMoreThan10Times(arrayData);

  writeData(result);
};

const processDataSync = () => {
  const data = fileReaderSync(fileDir);
  mainProcess(data);
};

const processData = () => {
  fileReader(fileDir, (data) => {
    mainProcess(data);
  });
};

module.exports = {
  processData,
  processDataSync,
};
