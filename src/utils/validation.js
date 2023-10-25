"use strict";

/**
 * 
 * @param {String} password 
 * @param {String} email
 * @returns {String}
 */

const bcrypt = require('bcrypt');

function validationPassword(password) {
    if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) {
        return new Error('El password debe contener al menos una letra y un número.');
    } else {
        let newPassword = bcrypt.hashSync(password, 12);
        return newPassword
    };
};

function validationEmail(email) {
    let emailCheck = email;
    if (email) {
        emailCheck.includes('@' && '.' && String);
    } else {
        return new Error('El mail no contiene @ y/o . necesarios.');
    };  
};

module.exports = {
    validationEmail,
    validationPassword
};