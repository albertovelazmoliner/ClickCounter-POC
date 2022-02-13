const path = require('path');
const { fileReaderSync } = require('./data/dataReader');
const { writeData } = require('./data/dataWriter');
const { FILE_DATA_CLICK, TIMESTAMP } = require('./common/constants');

const ipClickCounter = new Map();
const preData = new Map();
const fileDir = path.join(__dirname, FILE_DATA_CLICK);

const readData = () => JSON.parse(fileReaderSync(fileDir));

const counterControl = (click) => {
  if (ipClickCounter.has(click.ip)) {
    ipClickCounter.set(click.ip, ipClickCounter.get(click.ip) + 1);
  } else {
    ipClickCounter.set(click.ip, 1);
  }
};

const getClickPeriod = (clickTimeStamp) => {
  const timeData = clickTimeStamp.split(' ')[TIMESTAMP.TIME];
  const period = parseInt(timeData.split(':')[TIMESTAMP.HOUR], 10);
  return period + TIMESTAMP.PERIOD_CORRECTION;
};

const getClickDay = (clickTimeStamp) => clickTimeStamp.split(' ')[TIMESTAMP.DAY];

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
      if (unixTimestampElement < unixTimestampInPreData) {
        preData.set(key, element);
      }
    }
  } else {
    preData.set(key, element);
  }
};

const preDataToArray = () => {
  // eslint-disable-next-line no-unused-vars
  const arrayData = Array.from(preData, ([_, value]) => value);
  return arrayData;
};

const getIPsRepeatedMoreThan10Times = () => {
  const ips = [];
  ipClickCounter.forEach((value, key) => {
    if (value > 10) {
      ips.push(key);
    }
  });
  return ips;
};

const cleanRepeatedMoreThan10Times = (arrayData) => {
  const bannedIPs = getIPsRepeatedMoreThan10Times();
  const result = arrayData.filter((element) => !bannedIPs.includes(element.ip));
  return result;
};

const processData = (rawData) => {
  rawData.forEach((element) => {
    counterControl(element);
    addToList(element);
  });

  const arrayData = preDataToArray();
  const result = cleanRepeatedMoreThan10Times(arrayData);
  return result;
};

const data = readData();
const result = processData(data);

writeData(result);
