const Config = require('./config');
const logger = require('./logger');
const initServer = require('zimmed-server')(Config.server);

module.exports = () => {
    initServer().then(({host, port}) => {
        logger.info(`Socket server listening at ${host}:${port}...`);
    });
};
