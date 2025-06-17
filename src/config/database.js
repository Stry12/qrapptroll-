// src/config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // ← importante para Render
    },
  },
});

module.exports = sequelize;
