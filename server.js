'use strict';

const io = require('socket.io')();
const db = require('./db.js');
const token = require('./token.js');
const auth = require('./auth.js');

/**
 * Client send the message to server. Server get the message and send it back
 * @param client
 * @param data
 */
function messageHendler(client, data) {
    io.emit('msg-back', {
            message: data.msg,
            name: data.nick //client.name || 'Stranger'
        });
    console.log(`${data.nick} said: ${data.msg}`);
}

/**
 * On connection pass client
 */
io.on('connection', (client) => {
    console.log('Nowy client podłączył się');

    client.on('msg', auth(client, messageHendler));

    /**
     * 
     */
    client.on('login', (data) => {
        const split = data.split(' ');
        db.login(split[1], split[2])
            .then(user => {
                if(!user){
                    return client.emit('loggedin', {
                        error: 'Username or password is not equal'
                    });
                }
                return client.emit('loggedin', {
                    token: token.generate(user)
                })
            })
            .catch(err => {
                console.log('Error', err);
            });
    });

    /**
     * When the client is disconnect log the msg about it
     */
    client.on('disconnect', () => {
        console.log('Klient odłączył się');
    });
});

console.log('This is server');

io.listen(4000);