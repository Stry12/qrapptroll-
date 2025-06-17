// src/config/config.js
require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  dbUrl: process.env.DATABASE_URL, // ← aquí usamos la URL completa
  jwt: {
    secret: process.env.JWT_SECRET || 'secret123',
    expiresIn: '1d',
  },
};
