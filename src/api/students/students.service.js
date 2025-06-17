// src/api/students/students.service.js

const { Alumna } = require('../../db/models');

const getAll = async () => {
  return await Alumna.findAll();
};

const create = async (data) => {
  return await Alumna.create(data);
};

const bulkUpload = async (dataArray) => {
  if (!Array.isArray(dataArray)) throw new Error('El formato debe ser un array de alumnas');
  return await Alumna.bulkCreate(dataArray, { validate: true });
};

const deleteStudent = async (id) => {
  const student = await Alumna.findByPk(id);
  if (!student) throw new Error('Alumna no encontrada');
  await student.destroy();
};

module.exports = {
  getAll,
  create,
  bulkUpload,
  delete: deleteStudent
};
