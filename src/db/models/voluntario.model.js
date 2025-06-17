/**
 * @description Define el modelo de Sequelize para la tabla Voluntarios (PostgreSQL).
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
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false
    },
    contrasena_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'asistente'),
      allowNull: false
    }
  }, {
    tableName: 'voluntarios',
    timestamps: false
  });

  return Voluntario;
};
