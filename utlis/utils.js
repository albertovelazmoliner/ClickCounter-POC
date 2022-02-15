const { TIMESTAMP } = require('../common/constants');

const getClickPeriod = (clickTimeStamp) => {
  const timeData = clickTimeStamp.split(' ')[TIMESTAMP.TIME];
  const period = parseInt(timeData.split(':')[TIMESTAMP.HOUR], 10);
  return period + TIMESTAMP.PERIOD_CORRECTION;
};

const getClickDay = (clickTimeStamp) => clickTimeStamp.split(' ')[TIMESTAMP.DAY];

module.exports = {
  getClickPeriod,
  getClickDay,
};
