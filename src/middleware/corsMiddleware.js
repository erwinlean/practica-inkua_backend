"use strict";

const cors = require("cors");

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type, Authorization"
};

function corsConfig(req, res, next) {
    cors(corsOptions)(req, res, next);
};

module.exports = { corsConfig, corsOptions };