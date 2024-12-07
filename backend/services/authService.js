const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authService = {
    async register({ nombre, email, password }) {
        // Verificar si el usuario ya existe
        const userExists = await Usuario.findOne({ where: { email } });
        if (userExists) throw new Error('El email ya está registrado.');

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        return await Usuario.create({ nombre, email, password: hashedPassword });
    },

    async login({ email, password }) {
        // Buscar el usuario por email
        const user = await Usuario.findOne({ where: { email } });
        if (!user) throw new Error('Credenciales inválidas');

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Credenciales inválidas');

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id_usuario, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { token, user: { id: user.id_usuario, nombre: user.nombre, email: user.email } };
    },
};

module.exports = authService;
