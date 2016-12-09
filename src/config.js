const path = require('path');

module.exports = {
    server: {
        host: '0.0.0.0',
        port: 6001,
        channels: {
            default: {
                eventPath: path.join(__dirname, '/events-client'),
                connectionMiddleware: path.join(__dirname, '/auth/middleware/default.middleware.js')
            },
            downloader: {
                eventPath: path.join(__dirname, '/events-downloader'),
                connectionMiddleware: path.join(__dirname, '/auth/middleware/downloader.middleware.js')
            }
        },
        requestTimeout: 1000,
    },

    database: {
        host: 'localhost',
        port: '32778',
        name: 'DLGovernor',
        readyTimeout: 5000, // ms
        readyTick: 5 // ms
    },

    keys: {
        privateHashSeed: '0000000000000000',
        loginAESKey: '0000000000000000'
    },

    libraries: ['TV', 'Movies', 'Music', 'Apps', 'Documents', 'Other'],

    RSA: {
        bits: 512,
        exp: 65535
    },

    logger: {
        logLevel: 'debug',
        logName: 'DLGovernor'
    }
};
