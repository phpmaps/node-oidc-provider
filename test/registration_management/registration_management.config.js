const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');

const config = cloneDeep(require('../default.config.js'));

merge(config.features, {
  registrationManagement: { enabled: true, rotateRegistrationAccessToken: false },
  registration: { enabled: true },
});

module.exports = {
  config,
  client: {
    client_id: 'client',
    client_secret: 'secret',
    redirect_uris: ['https://client.example.com/cb'],
  },
};
