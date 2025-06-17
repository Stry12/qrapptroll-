const { DataTypes } = require('sequelize');

/**
 * @description Define el modelo de Sequelize para la tabla Eventos.
 * @param {import('sequelize').Sequelize} sequelize La instancia de Sequelize.
 * @returns El modelo Evento.
 */
module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'eventos',
    timestamps: false
  });

  return Evento;
};
