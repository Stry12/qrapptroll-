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
    tipo: {
      type: DataTypes.ENUM({
        values: ['ingreso', 'egreso'],
        name: 'registro_tipo_enum' // Explicit ENUM type name for PostgreSQL
      }),
      allowNull: false
    },
    fecha_hora: {
      type: DataTypes.DATE, // Or DataTypes.DATE with timezone if needed
      allowNull: false
    },
    se_retira_con_apoderado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    comentario: DataTypes.TEXT
  }, {
    tableName: 'registros',
    timestamps: false
  });

  return Registro;
};
