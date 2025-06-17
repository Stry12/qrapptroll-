const { DataTypes } = require('sequelize');

/**
 * @description Define el modelo de Sequelize para la tabla Registros de asistencia.
 * @param {import('sequelize').Sequelize} sequelize La instancia de Sequelize.
 * @returns El modelo Registro.
 */
module.exports = (sequelize, DataTypes) => {
  const Registro = sequelize.define('Registro', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipo: DataTypes.ENUM('ingreso', 'egreso'),
    fecha_hora: DataTypes.DATE,
    se_retira_con_apoderado: DataTypes.BOOLEAN,
    comentario: DataTypes.TEXT
  }, {
    tableName: 'registros',
    timestamps: false
  });

  return Registro;
};

