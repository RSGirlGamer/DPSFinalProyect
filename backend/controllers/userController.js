const userService = require('../services/userService');

const userController = {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({ message: 'Usuario creado con éxito', user });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
            res.json(user);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json({ message: 'Usuario actualizado con éxito', user });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async updateProfile (req, res) {
        try {
            const { username, email, password } = req.body;
    
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
            }
    
            const user = await userService.updateUser(req.user.id, { nombre: username, email, password });
            res.status(200).json({ message: 'Perfil actualizado correctamente.', user });
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            res.status(500).json({ message: error.message || 'Error del servidor.' });
        }
    }
};

module.exports = userController;
