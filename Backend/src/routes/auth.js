const express = require('express');
const router = express.Router();
const authController = require('../controller/authController'); // Corrige el nombre del archivo del controlador

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
