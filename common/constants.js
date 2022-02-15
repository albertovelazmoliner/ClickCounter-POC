const FILE_DATA_CLICK = '/data/clicks.json';
const TIMESTAMP = {
  DAY: 0,
  TIME: 1,
  HOUR: 0,
  MINUTES: 1,
  SECONDS: 2,
  PERIOD_CORRECTION: 1,
};
const KEY_IP = 0;
const LIMIT_IP_NUMBER = 10;
const CLICK_DATE_REGEX = '^([1-9]|([012][0-9])|(3[01])).([0]{0,1}[1-9]|1[012]).\\d\\d\\d\\d [012]{0,1}[0-9]:[0-6][0-9]:[0-6][0-9]$';

module.exports = {
  CLICK_DATE_REGEX,
  FILE_DATA_CLICK,
  KEY_IP,
  LIMIT_IP_NUMBER,
  TIMESTAMP,
};
