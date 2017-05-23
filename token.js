'use strict';
const jwt = require('jwt-simple');
const secret = 'oursecret12';

module.exports = {
  generate(user) {
      const payload = {
          name: user.name,
          iat: new Date() / 1000,
          exp: Math.round((new Date().getTime() + 7200000 / 1000))
      };
      return jwt.encode(payload, secret);
  }
};