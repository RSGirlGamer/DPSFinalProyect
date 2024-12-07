const pool = require('../config/db');

// Agregar asistente a un evento
exports.addAttendee = async (req, res) => {
    const { id_usuario, id_evento } = req.body;

    try {
        await pool.query(
            'INSERT INTO asistentes (id_usuario, id_evento) VALUES (?, ?)',
            [id_usuario, id_evento]
        );
        res.status(201).json({ message: 'Asistente agregado al evento con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar asistente' });
    }
};

// Obtener asistentes de un evento
exports.getAttendeesByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT u.id_usuario, u.nombre, u.email 
             FROM asistentes a 
             JOIN usuarios u ON a.id_usuario = u.id_usuario 
             WHERE a.id_evento = ?`,
            [eventId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener asistentes del evento' });
    }
};
