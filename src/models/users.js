"use strict";

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { validationPassword, validationEmail } = require("../utils/validation")

// Default IMG for users
const defaultImagePath = path.join(__dirname, '..', 'assets', 'users', 'default.png');
const defaultImageBase64 = fs.readFileSync(defaultImagePath, 'base64');
const defaultImageURI = `data:image/png;base64,${defaultImageBase64}`

const users = mongoose.Schema({
    name: {
        type: String,
        min: 4,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 7,
    },
    userImg: {
        type: String,
        default: defaultImageURI,
    }
});

// Hash and password validation+email
users.pre('save', function (next) {
    validationPassword(this.password);
    validationEmail(users.email);

    next();
});

module.exports = mongoose.model('users', users);