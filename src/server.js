// Carga las variables de entorno del archivo .env
require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database'); // CAMBIO AQUÍ
const db = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  console.log(db.sequelize.models);
  res.send('API de Registro de Asistencia está funcionando!');
});

// --- Rutas ---
const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes);

const studentsRoutes = require('./api/students/students.routes');
app.use('/api/students', studentsRoutes);

const attendanceRoutes = require('./api/attendance/attendance.routes');
app.use('/api/attendance', attendanceRoutes);

/**
 * Inicia el servidor luego de sincronizar la DB
 */
const startServer = async () => {
  try {
    // CAMBIO AQUÍ: Usamos sequelize directamente
    await sequelize.sync({ alter: true }); // O puedes usar force: true si estás en desarrollo

    app.listen(PORT, () => {
      console.log('✅ Base de datos sincronizada con éxito.');
      console.log(`✅ Servidor iniciado y escuchando en todas las interfaces de red.`);
      console.log(`   - Localmente: http://localhost:${PORT}`);
      console.log(`   - En tu red:  http://192.168.1.35:${PORT}`);
    });

  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor debido a un error con la base de datos.');
    console.error(error);
    process.exit(1);
  }
};

startServer();
