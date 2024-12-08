module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('asistentes', {
            id_asistente: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_evento: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('asistentes');
    },
};
