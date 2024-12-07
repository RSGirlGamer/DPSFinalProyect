const Comentario = require('../models/Comentario');

const commentService = {
    async addComment(data) {
        return await Comentario.create(data);
    },

    async getCommentsByEvent(eventId) {
        return await Comentario.findAll({
            where: { id_evento: eventId },
        });
    },
};

module.exports = commentService;
