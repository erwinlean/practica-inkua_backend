"use strinct";

const express = require('express');
const router = express.Router();
const { getUsers, createUser, userLogin, deleteUser, deleteAllUsers } = require('../controllers/usersController');
const { badMethod } = require("../utils/errorHandler");
const { jsonWebTokenVerify } = require("../middleware/authMiddleware")

/***** "/users" defined at app.js *****/

// Get users.
router.get('/', jsonWebTokenVerify, getUsers);
router.all('/', badMethod)

// Create users.
router.post('/create', createUser);
// Login.
router.post('/login', userLogin);

// Delete user by email and token required.
router.delete('/delete/:email', jsonWebTokenVerify,  deleteUser);
// Clear users, just for dev mode.
router.delete('/delete', jsonWebTokenVerify, deleteAllUsers);
router.all('/delete', badMethod)

module.exports = router;