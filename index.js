/* async solution */
const { processData } = require('./dataProcessor');

(async function start() {
  await processData();
}());
