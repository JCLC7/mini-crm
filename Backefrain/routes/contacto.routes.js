// routes/contacto.routes.js
const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contacto.controller');

// Ruta para POST /api/contacto
router.post('/contacto', contactoController.crearContacto);

module.exports = router;