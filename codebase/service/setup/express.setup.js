const fs = require('fs');
const path = require('path');
const app = require('express')();
const bp = require('body-parser');
const swaggerTools = require('swagger-tools');
const loadContract = require('utils/load-contract.utils');
const helloController = require('utils/hello.utils');

module.exports = function setup({ nasaAPI, nasaAPIKey }) {
    return new Promise((resolve, reject) => {

        const options = {
            controllers: fs.readdirSync(path.join(__dirname, '..', 'api'))
                .map(dir => path.join('service', 'api', dir)),
            useStubs: process.env.NODE_ENV === 'development',
        };

        const swaggerDoc = loadContract(path.join(__dirname, '../../contract/swagger.yaml'));

        if (!swaggerDoc) {
            return reject(new Error('There is no swagger.yaml file in contract directory'));
        }

        app.set('nasaAPI', nasaAPI);
        app.set('nasaAPIKey', nasaAPIKey);

        swaggerTools.initializeMiddleware(swaggerDoc, ({
            swaggerMetadata,
            swaggerValidator,
            swaggerRouter,
            swaggerUi
        }) => {
            app.use(bp.json());
            app.use(swaggerMetadata());
            app.use(swaggerValidator());
            app.use(swaggerRouter(options));
            app.use(swaggerUi());
            app.get('/', helloController);

            return resolve(app);
        });
    });
}
