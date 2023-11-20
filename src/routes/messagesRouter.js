"use strinct";
/* chat/comentarios de eventos tiene que tener relacion con el usuario y el evento */
/* y evento tiene que guardar id de comentarios (el cual tiene el usuario comentator)*/

const express = require('express');
const router = express.Router();
const { getMessages, createMessages, deleteMessage, deleteAllMessages } = require('../controllers/messagesController');
const { badMethod } = require("../utils/errorHandler");
const { jsonWebTokenVerify } = require("../middleware/authMiddleware")

/***** "/messages" defined at app.js *****/

// Get the Messages
router.get('/', getMessages);
router.all('/', badMethod)

// Create the Messages
router.post("/create", jsonWebTokenVerify, createMessages);

// Delete specific Messages based on email (must be the same as the creator)
router.delete("/delete/:MessagesId", jsonWebTokenVerify, deleteMessage);
router.delete("/deleteall", deleteAllMessages);

module.exports = router;