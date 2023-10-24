"use strict";

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Default IMG for users
const defaultImagePath = path.join(__dirname, '..', 'assets', 'events', 'default.png');
const defaultImageBase64 = fs.readFileSync(defaultImagePath, 'base64');
const defaultImageURI = `data:image/png;base64,${defaultImageBase64}`

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        min: 4,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    eventImg: {
        type: String,
        default: defaultImageURI,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    usersJoined: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    eventDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('events', eventSchema);