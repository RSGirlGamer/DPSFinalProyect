const authService = require('../services/authService');

const authController = {
    async register(req, res) {
        try {
            const { nombre, email, password } = req.body;
            const user = await authService.register({ nombre, email, password });
            res.status(201).json({ message: 'Usuario registrado con éxito', user });
        } catch (error) {
            console.error('Error en el registro:', error);
            res.status(400).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.login({ email, password });
            res.json({ message: 'Inicio de sesión exitoso', token, user });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(401).json({ error: error.message });
        }
    },
};

module.exports = authController;
