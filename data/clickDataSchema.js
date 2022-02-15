const { CLICK_DATE_REGEX, IPV4_IPV6_REGEX } = require('../common/constants');

const schema = {
  type: 'object',
  properties: {
    ip: {
      type: 'string',
      pattern: IPV4_IPV6_REGEX,
    },
    timestamp: {
      type: 'string',
      pattern: CLICK_DATE_REGEX,
    },
    amount: {
      type: 'number',
      multipleOf: 0.01,
    },
  },
  required: ['ip', 'timestamp', 'amount'],
  additionalProperties: false,
};

module.exports = schema;
