// src/api/attendance/attendance.service.js
const { Registro, Alumna, Voluntario, Evento, Categoria } = require('../../db/models');
const { Op } = require('sequelize');

exports.createRecord = async ({ rut, tipo, voluntario_id, comentario }) => {
  // Buscar a la alumna por RUT
  const alumna = await Alumna.findOne({
    where: { rut },
    include: [Evento, Categoria],
  });

  if (!alumna) throw new Error('Alumna no encontrada');

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Validar si ya existe un registro del mismo tipo hoy
  const yaRegistrado = await Registro.findOne({
    where: {
      alumna_id: alumna.id,
      tipo,
      fecha_hora: {
        [Op.gte]: hoy,
        [Op.lt]: new Date(hoy.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });
  if (yaRegistrado) {
    throw new Error(`Ya existe un registro de tipo "${tipo}" para esta alumna hoy.`);
  }

  // Validar que no se pueda egresar sin haber ingresado hoy
  if (tipo === 'egreso') {
    const tieneIngreso = await Registro.findOne({
      where: {
        alumna_id: alumna.id,
        tipo: 'ingreso',
        fecha_hora: {
          [Op.gte]: hoy,
          [Op.lt]: new Date(hoy.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });
    if (!tieneIngreso) throw new Error('No se puede egresar si no ha ingresado previamente hoy.');
  }

  // Registrar la asistencia
  const registro = await Registro.create({
    alumna_id: alumna.id,
    voluntario_id,
    tipo,
    comentario,
    fecha_hora: new Date(),
  });

  return {
    mensaje: 'Registro exitoso',
    nombre: `${alumna.nombre} ${alumna.apellido_paterno} ${alumna.apellido_materno}`,
    evento: alumna.Evento.nombre,
    categoria: alumna.Categoria.nombre,
    registro,
  };
};

exports.getAllRecords = async () => {
  return await Registro.findAll({
    include: [Alumna, Voluntario],
    order: [['fecha_hora', 'DESC']],
  });
};
