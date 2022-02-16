const { FILE_MOCK_DATA } = require('./common/constants');
const { processData } = require('./lib/dataProcessor');

(async function start() {
  await processData(FILE_MOCK_DATA);
}());
