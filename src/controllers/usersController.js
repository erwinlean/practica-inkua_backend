"use strict";

const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../middleware/authMiddleware');

module.exports = {

    getUsers: async function (req, res, next) {
        try {
            const allUsers = await users.find({}, { password: 0 });

            if (!allUsers || allUsers.length === 0) {
                return res.status(404).json({ message: 'Usuarios no encontrados.' });
            };

            return res.json({ usuarios: allUsers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    createUser: async function (req, res, next) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Faltan propiedades requeridas del usuario.' });
            };

            const existingUser = await users.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'El correo electrónico ya está en uso.' });
            };

            const newUser = new users({
                name,
                email,
                password,
            });

            await newUser.save();

            const token = jwt.sign(
                {
                    userId: newUser._id,
                    email: newUser.email,
                },
                config.jwtSecret,
                {
                    expiresIn: '1h',
                }
            );

            return res.json({ message: 'Usuario creado exitosamente.', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    userLogin: async function (req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await users.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'No se encontró un usuario con ese correo electrónico.' });
            };

            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta.' });
            };

            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                },
                config.jwtSecret,
                {
                    expiresIn: '1h',
                }
            );

            return res.json({ message: 'Inicio de sesión exitoso.', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    deleteUser: async function (req, res, next) {
        try {
            const token = req.header('Authorization.');

            if (!token) {
                return res.status(401).json({ message: 'Token de autenticación faltante.' });
            };

            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token inválido o expirado.' });
                } else {
                    const emailToDelete = req.params.email;

                    if (!emailToDelete) {
                        return res.status(400).json({ message: 'Se requiere el parámetro de correo electrónico.' });
                    };

                    users.findOneAndDelete({ email: emailToDelete }, (err, user) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: 'Error interno del servidor.' });
                        };
                        if (!user) {
                            return res.status(404).json({ message: `Usuario ${emailToDelete} no encontrado.` });
                        };
                        return res.json({ message: `Usuario ${emailToDelete} eliminado exitosamente.` });
                    });
                };
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    },

    deleteAllUsers: async function (req, res, next) {
        try {
            await users.deleteMany();
        
            return res.json({ message: "All users deleted successfully." });
        } catch (error) {
            console.log(error);
            return errorHandler(500, "Internal server error.", res);
        };
    }

};