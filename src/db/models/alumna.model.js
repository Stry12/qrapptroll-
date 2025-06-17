module.exports = (sequelize, DataTypes) => {
  const Alumna = sequelize.define('Alumna', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rut: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false
    },
    nombre: DataTypes.STRING(100),
    apellido_paterno: DataTypes.STRING(100),
    apellido_materno: DataTypes.STRING(100),
  }, {
    tableName: 'alumnas',
    timestamps: false
  });

  return Alumna;
};