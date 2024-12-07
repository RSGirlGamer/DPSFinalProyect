module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('eventos', {
            id_evento: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            descripcion: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            ubicacion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            creador: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('eventos');
    },
};
