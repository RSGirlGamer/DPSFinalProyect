const pool = require('../config/db');

exports.createEvent = async (req, res) => {
    const { nombre, descripcion, fecha, ubicacion, creador } = req.body;
    try {
        await pool.query(
            'INSERT INTO eventos (nombre, descripcion, fecha, ubicacion, creador) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, fecha, ubicacion, creador]
        );
        res.status(201).json({ message: 'Evento creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear evento' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM eventos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
};

exports.getEventDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener detalles del evento' });
    }
};
