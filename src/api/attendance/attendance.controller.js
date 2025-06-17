const attendanceService = require('./attendance.service');

// POST /attendance
exports.registrarAsistencia = async (req, res) => {
  try {
    const { id, tipo, comentario } = req.body;
    const voluntario_id = req.user.id; // del token JWT

    const resultado = await attendanceService.createRecord({
      id,
      tipo,
      comentario,
      voluntario_id,
    });

    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /attendance
exports.obtenerRegistros = async (req, res) => {
  try {
    const registros = await attendanceService.getAllRecords();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};
