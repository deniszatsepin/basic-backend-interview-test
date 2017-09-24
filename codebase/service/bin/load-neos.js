/* eslint-disable no-process-exit */
require('../module');
const loadAndPersist = require('utils/load-3-days-neo.utils').loadAndPersist;
const logger = require('utils/logger.utils');

loadAndPersist()
  .then((elementCount) => {
    logger.info(`${elementCount} Near Earth Objects loaded from NASA API`);
    process.exit(0);
  });
