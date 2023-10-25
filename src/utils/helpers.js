"use strict";

function passwordFilter(user) {
    const { _id, name, email, userImg, createDate } = user;
    return { _id, name, email, userImg, createDate };
};

module.exports = { passwordFilter };