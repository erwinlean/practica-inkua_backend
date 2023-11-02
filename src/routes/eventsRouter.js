"use strinct";

const express = require('express');
const router = express.Router();
const { getEvents, createEvents, usersJoiningEvent, userQuitEvent,updateEvent , deleteEvent, deleteAllEvents} = require('../controllers/eventsController');
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
// User quit event
router.put("/userquit", jsonWebTokenVerify, userQuitEvent);
// Event update/modify
router.put("/update", jsonWebTokenVerify, updateEvent)

// Delete specific event based on email (must be the same as the creator)
router.delete("/delete/:eventId", jsonWebTokenVerify, deleteEvent);
router.delete("/deleteall", deleteAllEvents);

module.exports = router;