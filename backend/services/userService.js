const Usuario = require('../models/Usuario');

const userService = {
    async createUser(data) {
        return await Usuario.create(data);
    },

    async getAllUsers() {
        return await Usuario.findAll({ attributes: ['id_usuario', 'nombre', 'email'] });
    },

    async getUserById(id) {
        return await Usuario.findByPk(id, { attributes: ['id_usuario', 'nombre', 'email'] });
    },

    async updateUser(id, data) {
        const user = await Usuario.findByPk(id);
        if (!user) throw new Error('Usuario no encontrado');
        return await user.update(data);
    },

    async deleteUser(id) {
        const user = await Usuario.findByPk(id);
        if (!user) throw new Error('Usuario no encontrado');
        return await user.destroy();
    },


};

module.exports = userService;
