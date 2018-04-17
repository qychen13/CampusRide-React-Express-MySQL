var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const {domain} = require('./auth0-variables.js')
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`
    }),
    audience: `https://${domain}/userinfo`,
    issuer: `https://${domain}/`,
    algorithms: ['RS256']
});

module.exports = jwtCheck;
