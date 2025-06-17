const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize'); // ✅ Corrección aquí
const sequelize = require('../../config/database'); // ✅ Instancia configurada
const basename = path.basename(__filename);

const db = {};

// Lee todos los archivos de modelos del directorio actual
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes); // ✅ Corrección aquí
    db[model.name] = model;
  });

// Ejecuta las asociaciones definidas en cada modelo (si las hay)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Relaciones explícitas (por si no usas `.associate` en los modelos)
db.Evento.hasMany(db.Alumna, { foreignKey: 'evento_id' });
db.Alumna.belongsTo(db.Evento, { foreignKey: 'evento_id' });

db.Categoria.hasMany(db.Alumna, { foreignKey: 'categoria_id' });
db.Alumna.belongsTo(db.Categoria, { foreignKey: 'categoria_id' });

db.Alumna.belongsToMany(db.Apoderado, {
  through: 'Alumna_Apoderado', // Nombre real del modelo, no string arbitrario
  foreignKey: 'alumna_id',
  otherKey: 'apoderado_id',
  timestamps: false,
});
db.Apoderado.belongsToMany(db.Alumna, {
  through: 'Alumna_Apoderado',
  foreignKey: 'apoderado_id',
  otherKey: 'alumna_id',
  timestamps: false,
});

db.Voluntario.hasMany(db.Registro, { foreignKey: 'voluntario_id' });
db.Registro.belongsTo(db.Voluntario, { foreignKey: 'voluntario_id' });

db.Alumna.hasMany(db.Registro, { foreignKey: 'alumna_id' });
db.Registro.belongsTo(db.Alumna, { foreignKey: 'alumna_id' });

// Exportar instancia y modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
