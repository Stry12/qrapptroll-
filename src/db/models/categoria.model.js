/**
 * @description Define el modelo de Sequelize para la tabla Categorias (PostgreSQL compatible).
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
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'categorias',
    timestamps: false,
    underscored: true // Optional: uses snake_case columns
  });

  return Categoria;
};
