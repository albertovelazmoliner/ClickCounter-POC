const { expect } = require('chai');
const { clickIsValid } = require('../utlis/dataValidator');

const VALID_CLICK_DATA = { "ip":"55.55.55.55", "timestamp":"3/11/2020 14:03:04", "amount": 5.25 };
const NOT_VALID_CLICK_DATA_BAD_IP = { "ip":"355.55.55.55", "timestamp":"3/11/2020 14:03:04", "amount": 5.25 };
const NOT_VALID_CLICK_DATA_BAD_TIMESTAMP = { "ip":"55.55.55.55", "timestamp":"3/11/2020 14:73:04", "amount": 5.25 };
const NOT_VALID_CLICK_DATA_BAD_AMOUNT_1 = { "ip":"355.55.55.55", "timestamp":"3/11/2020 14:03:04", "amount": 5.253 };
const NOT_VALID_CLICK_DATA_BAD_AMOUNT_2 = { "ip":"355.55.55.55", "timestamp":"3/11/2020 14:03:04", "amount": "5.25" };

describe('[Data Validator utility tests]', () => {
    const originalConsoleLog = console.log;
    before(() => {
        console.log = () => {};
    });
    after(() => {
        console.log = originalConsoleLog;
      });
    it('[DVT - 01] - clickIsValid with valid click data return true', () => {
        expect(clickIsValid(VALID_CLICK_DATA)).to.equal(true);
    });

    it('[DVT - 02] - clickIsValid with not valid click data (bad IP) return false', () => {
        expect(clickIsValid(NOT_VALID_CLICK_DATA_BAD_IP)).to.equal(false);
    });

    it('[DVT - 03] - clickIsValid with not valid click data (bad timestamp) return false', () => {
        expect(clickIsValid(NOT_VALID_CLICK_DATA_BAD_TIMESTAMP)).to.equal(false);
    });

    it('[DVT - 04] - clickIsValid with not valid click data (bad amount - too many decimals) return false', () => {
        expect(clickIsValid(NOT_VALID_CLICK_DATA_BAD_AMOUNT_1)).to.equal(false);
    });

    it('[DVT - 05] - clickIsValid with not valid click data (bad amount - is a string) return false', () => {
        expect(clickIsValid(NOT_VALID_CLICK_DATA_BAD_AMOUNT_2)).to.equal(false);
    });
});