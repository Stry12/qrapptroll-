// src/api/students/students.controller.js

const studentsService = require('./students.service');

/** Obtener todas las alumnas */
const getAllStudents = async (req, res) => {
  try {
    const students = await studentsService.getAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Crear una alumna */
const createStudent = async (req, res) => {
  const data = req.body;
  try {
    const newStudent = await studentsService.create(data);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//** Eliminar una alumna */
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await studentsService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Subida masiva de alumnas (espera array en body) */
const bulkUpload = async (req, res) => {
  const data = req.body;
  try {
    const result = await studentsService.bulkUpload(data);
    res.status(201).json({ inserted: result.length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  deleteStudent,
  bulkUpload
};
