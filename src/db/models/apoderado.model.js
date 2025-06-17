const { DataTypes } = require('sequelize');

/**
 * @description Define el modelo de Sequelize para la tabla Apoderados.
 * @param {import('sequelize').Sequelize} sequelize La instancia de Sequelize.
 * @returns El modelo Apoderado.
 */
module.exports = (sequelize, DataTypes) => {
  const Apoderado = sequelize.define('Apoderado', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: DataTypes.STRING(100),
    apellido_paterno: DataTypes.STRING(100),
    apellido_materno: DataTypes.STRING(100),
  }, {
    tableName: 'apoderados',
    timestamps: false
  });

  return Apoderado;
};


