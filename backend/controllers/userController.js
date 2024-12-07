const pool = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_usuario, nombre, email FROM usuarios');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
