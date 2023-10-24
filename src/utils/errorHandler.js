"use strict";

function badMethod() {
    return  res.status(405).json({ message: 'Method Not Allowed' });
};



module.exports = {badMethod};