"use strict";

function ipCheck(req, res, next) {
    const allowedIP = "::1"; // localhost, to modify witch a list if needed
    //const allowedIP = "1.1"; test for specific IP, worked.
    const requestIP = req.ip;

    console.dir(requestIP);

    if (requestIP !== allowedIP) {
        return res.status(403).json({ error: 'Access denied from this IP address.' });
    };

    next();
};

module.exports = { ipCheck };