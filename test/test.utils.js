const { expect } = require('chai');
const {
  clickDataToArray,
  getClickPeriod,
  getClickDay,
} = require('../utlis/utils');

const PERIOD_3 = 3;
const PERIOD_6 = 6;
const PERIOD_7 = 7;

const DAY_3 = '3/11/2020';
const DAY_4 = '4/11/2020';
const DAY_5 = '5/11/2020';

const VALID_CLICKS_DATA = [
    { 'ip':'44.44.44.44', 'timestamp':'3/11/2020 02:13:54', 'amount': 8.75 },
    { 'ip':'22.22.22.22', 'timestamp':'4/11/2020 05:02:45', 'amount': 11.00 },
    { 'ip':'44.44.44.44', 'timestamp':'5/11/2020 06:32:42', 'amount': 5.00 },
];

describe('[Utils tests]', () => {
  it('[UT - 01] getClickPeriod for all records', async () => {
    expect(getClickPeriod(VALID_CLICKS_DATA[0].timestamp)).to.equal(PERIOD_3);
    expect(getClickPeriod(VALID_CLICKS_DATA[1].timestamp)).to.equal(PERIOD_6);
    expect(getClickPeriod(VALID_CLICKS_DATA[2].timestamp)).to.equal(PERIOD_7);
  });

  it('[UT - 02] getClickDay for all records', async () => {
    expect(getClickDay(VALID_CLICKS_DATA[0].timestamp)).to.equal(DAY_3);
    expect(getClickDay(VALID_CLICKS_DATA[1].timestamp)).to.equal(DAY_4);
    expect(getClickDay(VALID_CLICKS_DATA[2].timestamp)).to.equal(DAY_5);
  });

  it('[UT - 03] clickDataToArray for all records', async () => {
    const CLICK_DATA_MAP = new Map();
    VALID_CLICKS_DATA.forEach((click) => {
      CLICK_DATA_MAP.set(`${click.ip}-${click.timestamp}`, click);
    });
    const CLICK_DATA_ARRAY = clickDataToArray(CLICK_DATA_MAP);
    expect(CLICK_DATA_ARRAY).to.be.an('array');
    expect(CLICK_DATA_ARRAY.length).to.equal(3);
    expect(CLICK_DATA_ARRAY).to.be.deep.equal(VALID_CLICKS_DATA);
  });
});
