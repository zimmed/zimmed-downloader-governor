const _ = require('lodash');
const timestamp = require('zimmed-timestamp');
const cypher = require('zimmed-cypher');
const dbTable = require('../db').table('downloaders');
const cache = require('zimmed-simple-cache')('auth');
const Config = require('../config');

const HMAC = cypher.hmac;
const RSA = cypher.rsa;
const REQUEST_TIMEOUT = Config.server.requestTimeout;

const Auth = {

    response: (downloaderName, data, encrypt=false) => {
        let ts = timestamp('ms'),
            config = cache.get(`downloaders.${downloaderName}`);

        data = encrypt ? {encrypted: config.pub.encrypt(data)} : data;
        return config && {hmac: HMAC(config.apiKey, ts, data), ts, data} || {};
    },

    hmacIsValid: (hmac, key, ts, ...data) => {
        let vTime = parseInt(ts) < timestamp('ms') + REQUEST_TIMEOUT;

        return vTime && hmac === HMAC(key, ts, ...data);
    },

    parseRequest: (downloaderName, {hmac, ts, data}) => {
        let parsed,
            config = cache.get(`downloaders.${downloaderName}`);

        if (config && Auth.hmacIsValid(hmac, config.apiKey, ts, data)) {
            parsed = _.has(data, 'encrypted') && config.pem.decrypt(data.encrypted) || data;
        } else {
            parsed = null;
        }

        return parsed;
    },

    setPublicKey: (downloaderName, pubKey) => {
        return pubKey && cache.set(`downloaders.${downloaderName}.pub`, rsa.load(pubKey));
    },

    createPair: (downloaderName) => {
        cache.set(`downloaders.${downloaderName}.pem`, RSA.create(Config.RSA.bits, Config.RSA.exp)).pub();
    },

    dumpCache: (downloaderName) => {
        cache.del(`downloaders.${downloaderName}`);
    },

    validateConnectionRequest: ({hmac, ts, name}) => {
        dbTable.get(name)
            .then(doc => {
                if (!doc) {
                    throw 400;
                }
                if (Auth.hmacIsValid(hmac, doc.apiKey, ts, name)) {
                    Auth.dumpCache(name);
                    cache.set(`downloaders.${name}`, {apiKey: doc.apiKey});
                    return name;
                }
                throw 401;
            });
    }
};

module.exports = Auth;
