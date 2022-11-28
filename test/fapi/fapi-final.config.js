const crypto = require('node:crypto');

const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');

const config = cloneDeep(require('../default.config.js'));

const keypair = crypto.generateKeyPairSync('ec', { namedCurve: 'P-256' });

merge(config.features, {
  fapi: {
    enabled: true,
  },
  jwtResponseModes: { enabled: true },
  requestObjects: {
    request: true,
    mode: 'strict',
  },
});
config.enabledJWA = {
  requestObjectSigningAlgValues: ['ES256'],
};

module.exports = {
  config,
  clients: [{
    client_id: 'client',
    response_types: ['code id_token', 'code'],
    grant_types: ['implicit', 'authorization_code'],
    redirect_uris: ['https://client.example.com/cb'],
    token_endpoint_auth_method: 'none',
    jwks: {
      keys: [keypair.publicKey.export({ format: 'jwk' })],
    },
  }],
  keypair,
};
