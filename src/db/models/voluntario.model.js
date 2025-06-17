const { DataTypes } = require('sequelize');

/**
 * @description Define el modelo de Sequelize para la tabla Voluntarios.
 * @param {import('sequelize').Sequelize} sequelize La instancia de Sequelize.
 * @returns El modelo Voluntario.
 */
module.exports = (sequelize, DataTypes) => {
  const Voluntario = sequelize.define('Voluntario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    correo_electronico: {
      type: DataTypes.STRING,
      unique: true
    },
    contrasena_hash: DataTypes.STRING,
    rol: DataTypes.ENUM('admin', 'asistente')
  }, {
    tableName: 'voluntarios',
    timestamps: false
  });

  return Voluntario;
};
