"use strict";

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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
    },
    // TO ADD RELATION BETWEN THE USER AND THE EVENTS THEY ARE IN OR CREATED.
    //events: [{
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'events',
    //    default: null
    //}]
});

module.exports = mongoose.model('users', users);