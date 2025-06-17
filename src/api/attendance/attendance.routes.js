// src/api/attendance/attendance.routes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('./attendance.controller');

// ⚠️ Asegúrate de pasar la función como referencia, NO la ejecutes.
router.post('/', attendanceController.registrarAsistencia);
router.get('/', attendanceController.obtenerRegistros);

module.exports = router;
