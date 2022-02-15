const Ajv = require('ajv');
const ClickSchema = require('../data/clickDataSchema');

const ajv = new Ajv();
const validateClickData = ajv.compile(ClickSchema);

const clickIsValid = (click) => {
  const valid = validateClickData(click);
  if (!valid) {
    // eslint-disable-next-line no-console
    console.log(validateClickData.errors);
    return false;
  }
  return true;
};

module.exports = {
  clickIsValid,
};
