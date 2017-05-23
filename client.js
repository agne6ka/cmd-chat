'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:4000');
let token;

/**
 * Readline allow you to prompt msg
 */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * @param msg
 */
function consoleOut(...msg) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(msg.join(' '));
    readline.prompt(true);
}

socket.on('loggedin', data => {
    console.log(data);
    if (data.error){
        return consoleOut(data.error);
    }
    token = data.token;
});

/**
 * When user type the msg send it to server
 */
readline.on('line', line =>{
    if (line.startsWith('/login')) {
        // let index = line.indexOf(' '), name = line.slice(index, line.length);
        socket.emit('login', line);
    } else {
        socket.emit('msg', { token: token, msg: line});
    }
});

/**
 * When server send msg we get it back and log it in console
 */
socket.on('msg-back', (data) => {
    consoleOut(data.name , data.message);
});

socket.on('server-msg', (data) => {
    consoleOut(data);
});

readline.prompt();