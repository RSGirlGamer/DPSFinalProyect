const express = require('express');
const { addAttendee, getAttendeesByEvent } = require('./controllers/attendeeController');
const router = express.Router();

router.post('/', addAttendee); // Agregar asistente a un evento
router.get('/:eventId', getAttendeesByEvent); // Obtener asistentes de un evento

module.exports = router;
