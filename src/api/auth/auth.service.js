// src/api/auth/auth.service.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const { Op } = require('sequelize');

/**
 * Login de voluntarios
 */
const login = async (correo_electronico, contrasena) => {
  const voluntario = await db.Voluntario.findOne({ where: { correo_electronico } });
  if (!voluntario) throw new Error('Correo electrónico no registrado');

  const validPassword = await bcrypt.compare(contrasena, voluntario.contrasena_hash);
  if (!validPassword) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { id: voluntario.id, rol: voluntario.rol },
    process.env.JWT_SECRET || 'secreto',
    { expiresIn: '2h' }
  );

  return token;
};

/**
 * Registrar nuevo voluntario
 */
const register = async ({ nombre, correo_electronico, contrasena, rol }) => {
  const existente = await db.Voluntario.findOne({ where: { correo_electronico } });
  if (existente) throw new Error('Correo ya registrado');

  const contrasena_hash = await bcrypt.hash(contrasena, 10);

  const nuevo = await db.Voluntario.create({ nombre, correo_electronico, contrasena_hash, rol });
  return { id: nuevo.id, nombre: nuevo.nombre, correo_electronico: nuevo.correo_electronico, rol: nuevo.rol };
};

/**
 * Obtener todos los voluntarios (sin contraseña)
 */
const getVolunteers = async () => {
  return db.Voluntario.findAll({
    attributes: ['id', 'nombre', 'correo_electronico', 'rol'],
  });
};

/**
 * Eliminar voluntario por ID
 */
const deleteVolunteer = async (id) => {
  const eliminado = await db.Voluntario.destroy({ where: { id } });
  if (!eliminado) throw new Error('No se encontró el voluntario');
};

module.exports = {
  login,
  register,
  getVolunteers,
  deleteVolunteer,
};
