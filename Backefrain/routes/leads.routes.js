// routes/leads.routes.js
const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');
const { protect } = require('../middleware/auth.middleware'); // <-- Importamos nuestro guardián

// Aplicamos el middleware 'protect' a esta ruta.
// Primero se ejecuta 'protect', y si el token es válido, se ejecuta 'getAllLeads'.
router.get('/', protect, leadsController.getAllLeads);
router.put('/:id/status', protect, leadsController.updateLeadStatus);

module.exports = router;