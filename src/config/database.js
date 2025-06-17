const { Sequelize } = require('sequelize');
const config = require('./config');

console.log('🔌 Conectando a PostgreSQL con:');
console.log(config);

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: config.DB_DIALECT,
  port: config.DB_PORT,
  logging: false, // Opcional: apaga logs de SQL
});

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    await sequelize.sync({ alter: true });
    console.log('📦 Base de datos sincronizada.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  syncDatabase,
};
