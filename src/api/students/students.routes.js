// src/api/students/students.routes.js

const express = require('express');
const router = express.Router();
const studentsController = require('./students.controller');

// Obtener todas las alumnas
router.get('/', studentsController.getAllStudents);

// Crear una nueva alumna
router.post('/', studentsController.createStudent);

// Subida masiva de alumnas
router.post('/upload', studentsController.bulkUpload);

// Eliminar una alumna
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
