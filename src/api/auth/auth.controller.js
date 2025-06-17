// src/api/auth/auth.controller.js

const authService = require('./auth.service');

/**
 * Controlador para iniciar sesión.
 */
const login = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;
  console.log(
    `Intento de inicio de sesión con correo: ${correo_electronico}, contraseña: ${contrasena.length > 0 ? '********' : 'vacía'}`
  );
  try {
    const token = await authService.login(correo_electronico, contrasena);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

/**
 * Controlador para registrar un nuevo voluntario.
 */
const register = async (req, res) => {
  const { nombre, correo_electronico, contrasena, rol } = req.body;
  try {
    const nuevoVoluntario = await authService.register({ nombre, correo_electronico, contrasena, rol });
    res.status(201).json(nuevoVoluntario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Obtener todos los voluntarios con sus credenciales (excepto contraseñas).
 */
const getVolunteers = async (req, res) => {
  try {
    const voluntarios = await authService.getVolunteers();
    res.status(200).json(voluntarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Eliminar voluntario por ID.
 */
const deleteVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    await authService.deleteVolunteer(id);
    res.status(200).json({ message: 'Voluntario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  getVolunteers,
  deleteVolunteer,
};