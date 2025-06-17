const { DataTypes } = require('sequelize');

/**
 * @description Define el modelo de Sequelize para la tabla Categorias.
 * @param {import('sequelize').Sequelize} sequelize La instancia de Sequelize.
 * @returns El modelo Categoria.
 */
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
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
    tableName: 'categorias',
    timestamps: false
  });

  return Categoria;
};
