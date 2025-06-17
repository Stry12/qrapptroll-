// /config/config.js
require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'control_qr',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret123',
    expiresIn: '1d',
  },
};
