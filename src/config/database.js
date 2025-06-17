// src/config/database.js

const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
  }
);

// ✅ Agrega esta función:
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    await sequelize.sync(); // crea tablas si no existen
    console.log('📦 Tablas sincronizadas.');
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error.message);
    throw error;
  }
};

module.exports = sequelize;         // para usar sequelize directamente
module.exports.syncDatabase = syncDatabase; // para importar la función en server.js
