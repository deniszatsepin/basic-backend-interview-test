const path = require('path');

module.exports = {
    "plugins": [
        "node"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended"
    ],
    "rules": {
        "indent": ["error", 2],
        "node/exports-style": [
            "error",
            "module.exports"
        ],
        "node/no-missing-require": ["error", {
            "resolvePaths": [path.join(__dirname, 'service')]
        }]
    },
    "env": {
        "node": true,
        "mocha": true
    }
};
