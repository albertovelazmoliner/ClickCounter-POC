const schema = {
  type: 'object',
  properties: {
    ip: { type: 'string' },
    timestamp: { type: 'string' },
    amount: {
      type: 'number',
      multipleOf: 0.01,
    },
  },
  required: ['ip', 'timestamp', 'amount'],
  additionalProperties: false,
};

module.exports = schema;
