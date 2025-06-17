// Carga las variables de entorno del archivo .env
// ¡Esta debe ser la primera línea de tu aplicación!
require('dotenv').config();

const express = require('express');
const { syncDatabase } = require('./config/database');
const db = require('./db/models');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
  origin: '*', // Permite todas las solicitudes CORS
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type, Authorization' // Encabezados permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  console.log(db.sequelize.models);
  res.send('API de Registro de Asistencia está funcionando!');
});

// --- Tus Rutas ---
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
    await syncDatabase();
    
    // --- PASO 2: Añade el HOST al método listen ---
    // Ahora el servidor aceptará conexiones desde tu IP de red (192.168.1.35)
    app.listen(PORT, () => {
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
