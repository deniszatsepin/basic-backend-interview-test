const dbSetup = require('setup/db.setup');
const expressSetup = require('setup/express.setup');

const {
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

const appConfig = {
    nasaAPI: NASA_API,
    nasaAPIKey: NASA_API_KEY
};

module.exports = function setup() {
    return dbSetup(dbConfig)
        .then(() => expressSetup(appConfig))
        .then((server) => {
            server.set('APP_PORT', APP_PORT);
            return server;
        });
};
