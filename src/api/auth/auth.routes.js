// src/api/auth/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

// Rutas de autenticación y gestión de voluntarios
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/volunteers', authController.getVolunteers);
router.delete('/volunteers/:id', authController.deleteVolunteer);

module.exports = router;
