const pool = require('../config/db');

// Agregar comentario a un evento
exports.addComment = async (req, res) => {
    const { id_evento, id_usuario, comentario, calificacion } = req.body;

    try {
        await pool.query(
            'INSERT INTO comentarios (id_evento, id_usuario, comentario, calificacion) VALUES (?, ?, ?, ?)',
            [id_evento, id_usuario, comentario, calificacion]
        );
        res.status(201).json({ message: 'Comentario agregado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al agregar comentario' });
    }
};

// Obtener comentarios de un evento
exports.getCommentsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT c.id_comentario, c.comentario, c.calificacion, u.nombre AS autor 
             FROM comentarios c 
             JOIN usuarios u ON c.id_usuario = u.id_usuario 
             WHERE c.id_evento = ?`,
            [eventId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener comentarios del evento' });
    }
};
