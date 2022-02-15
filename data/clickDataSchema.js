const schema = {
  type: 'object',
  properties: {
    ip: { type: 'string' },
    timestamp: {
      type: 'string',
      pattern: '^([1-9]|([012][0-9])|(3[01])).([0]{0,1}[1-9]|1[012]).\\d\\d\\d\\d [012]{0,1}[0-9]:[0-6][0-9]:[0-6][0-9]$',
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
