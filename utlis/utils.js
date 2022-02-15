const { TIMESTAMP } = require('../common/constants');

const getClickPeriod = (clickTimeStamp) => {
  const timeData = clickTimeStamp.split(' ')[TIMESTAMP.TIME];
  const period = parseInt(timeData.split(':')[TIMESTAMP.HOUR], 10);
  return period + TIMESTAMP.PERIOD_CORRECTION;
};

const getClickDay = (clickTimeStamp) => clickTimeStamp.split(' ')[TIMESTAMP.DAY];

const clickDataToArray = (data) => {
  // eslint-disable-next-line no-unused-vars
  const arrayData = Array.from(data, ([_, value]) => value);
  return arrayData;
};

module.exports = {
  clickDataToArray,
  getClickPeriod,
  getClickDay,
};
