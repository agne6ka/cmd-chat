'use strict';

const jwt = require('jwt-simple');
const secret = "oursecret12";

function authenticate(client, successFn) {
    return function(event) {
        let decoded;
        try {
            decoded = jwt.decode(event.token, secret);
            console.log('decoded', decoded)
        } catch (ex) {
            console.log('error', ex);
            return client.emit('msg', ex.message);
        }
        event.nick = decoded.name;
        return successFn(client, event);
    };
}

module.exports = authenticate;
