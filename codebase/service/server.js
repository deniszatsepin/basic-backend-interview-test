require('./module');
const dbSetup = require('setup/db.setup');
const expressSetup = require('setup/express.setup');
const logger = require('utils/logger.utils');

const {
  NODE_ENV,
  NASA_API,
  NASA_API_KEY,
  APP_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

const dbConfig = {
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME
};

const apiConfig = {
  nasaAPI: NASA_API,
  nasaAPIKey: NASA_API_KEY
};

const serverSetup = module.exports = function setup(_dbConfig = dbConfig, _apiConfig = apiConfig) {
  return dbSetup(_dbConfig)
    .then(() => expressSetup(_apiConfig));
};

if (NODE_ENV !== 'test') {
  serverSetup()
    .then(server => new Promise((resolve, reject) => {
      return server.listen(APP_PORT, (err) => {
        if (err) return reject(err);
        logger.info(`Server listening on port ${APP_PORT}`);

        return resolve(server);
      });
    }))
    .catch(err => logger.error(err));
}
