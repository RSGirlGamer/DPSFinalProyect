module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('comentarios', {
            id_comentario: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_evento: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            comentario: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            calificacion: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('comentarios');
    },
};
