const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comentario = sequelize.define('Comentario', {
    id_comentario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'comentarios',
    timestamps: true,
});

module.exports = Comentario;
