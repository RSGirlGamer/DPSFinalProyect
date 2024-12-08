const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asistente = sequelize.define('Asistente', {
    id_asistente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'asistentes',
    timestamps: false,
});

module.exports = Asistente;
