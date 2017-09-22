/* eslint-disable node/no-unpublished-require*/
const supertest = require('supertest');
const serverSetup = require('../server');

module.exports = function setup(dbConfig, apiConfig) {
    return serverSetup(dbConfig, apiConfig)
        .then((server) => {
            const api = supertest(server);
            api.server = server;
            return api;
        });
};
