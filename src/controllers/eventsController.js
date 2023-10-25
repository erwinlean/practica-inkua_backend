"use strict";

const Event = require('../models/events');
const User = require("../models/users");
const { geoLocalization } = require("../utils/geoLocalization");
const { passwordFilter } = require("../utils/helpers");

module.exports = {

    getEvents: async function (req, res, next) {
        try {
            const allEvents = await Event.find();
            if (!allEvents || allEvents.length === 0) {
                return res.status(404).json({ message: 'Eventos no encontrados.' });
            };
            return res.json({ eventos: allEvents });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    createEvents: async function (req, res, next) {
        try {
            const { title, location, eventImg, createdBy, eventDate } = req.body;

            const eventOwner = await User.findOne({ _id: createdBy });

            if(!eventOwner){
                return res.status(404).json({message : "Usuario no encontrado."});
            };

            const map = await geoLocalization(location);

            const eventOwnedWithoutPassword = passwordFilter(eventOwner);console.log(eventOwnedWithoutPassword)
            const eventData = { title, location, eventImg, eventDate, eventOwnedWithoutPassword };

            const newEvent = new Event({
                title,
                location,
                eventImg,
                eventOwnedWithoutPassword,
                eventDate,
                map
            });

            await newEvent.save();

            return res.status(201).json({
                message: `Evento ${title} creado exitosamente.`,
                mapLink: map,
                evento: eventData
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    usersJoiningEvent: async function (req, res, next) {
        try {
            const { eventId, userId } = req.body;

            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: 'Evento no encontrado.' });
            }

            event.usersJoined.push(userId);
            await event.save();

            return res.status(204).json({ message: `El usuario ${userId} se unió al evento.` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    deleteEvent: async function (req, res, next) {
        try {
            const { eventId } = req.params;

            const deletedEvent = await Event.findByIdAndDelete(eventId);

            if (!deletedEvent) {
                return res.status(404).json({ message: 'Evento no encontrado.' });
            }

            return res.status(200).json({ message: `El evento ${deletedEvent.title} fue eliminado.` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },
    
    deleteAllEvents: async function (req, res, next) {
        try {
            const deletedEvent = await Event.deleteMany({});

            return res.status(200).json({ message: `Eventos eliminados.` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    }
        
};