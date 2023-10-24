"use strinct";

const express = require('express');
const router = express.Router();
const { getEvents, createEvents, usersJoiningEvent, deleteEvent} = require('../controllers/eventsController');
const { badMethod } = require("../utils/errorHandler");
const { jsonWebTokenVerify } = require("../middleware/authMiddleware")

/***** "/events" defined at app.js *****/

// Get the events
router.get('/', getEvents);
router.all('/', badMethod)

// Create the event
router.post("/create", jsonWebTokenVerify, createEvents);
// Upload user to the event
router.put("/usersevent", jsonWebTokenVerify, usersJoiningEvent);

// Delete specific event based on email (must be the same as the creator)
router.delete("/delete", jsonWebTokenVerify, deleteEvent);

module.exports = router;