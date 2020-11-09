const axios = require('axios');

// TODO: Implement
const authCheck = (router) => (req, res, next) => {
  if (req.headers.Authorization) {
    const token = req.headers.Authorization.split('Bearer ');
  }
  const clientId = localStorage('userInformation').id;
  const authenticationUrl = 'https://api.github.com/applications/';
  // :client_id/tokens/:token
  axios.post(authenticationUrl, {
    client_id,
    token,
  });
};

module.exports = authCheck;

//  https://api.github.com/applications/:client_id/tokens/:token | "Authorization: token OAUTH-TOKEN"
