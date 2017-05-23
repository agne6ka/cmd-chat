'use strict';

const _ = require('lodash');

const users = [
    {
        name: 'Ada',
        password: '123'
    },
    {
        name: 'Michał',
        password:'super12'
    },
    {
        name: 'Przemek',
        password:'test12'
    }
];

module.exports = {
    login(login, password) {
        return new Promise((resolve, reject) => {
            const found = _.find(users, (usr) => {
                return usr.name === login;
            });
            if(!found){
                resolve(false);
            }
            if(found.password === password){
                resolve(found);
            }
            resolve(false);
        });
    }
};
