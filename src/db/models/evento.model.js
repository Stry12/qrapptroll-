/**
 * @description Define el modelo de Sequelize para la tabla Eventos (PostgreSQL).
 * @param {import('sequelize').Sequelize} sequelize La instancia de Sequelize.
 * @returns El modelo Evento.
 */
module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      unique: true
    }
  }, {
    tableName: 'eventos',
    timestamps: false
  });

  return Evento;
};
