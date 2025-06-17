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
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido_materno: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'alumnas',
    timestamps: false,
    schema: 'public' // Optional: specify schema for PostgreSQL
  });

  return Alumna;
};