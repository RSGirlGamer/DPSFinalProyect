const commentService = require('../services/commentService');

const commentController = {
    async addComment(req, res) {
        try {
            const comment = await commentService.addComment(req.body);
            res.status(201).json({ message: 'Comentario agregado con éxito', comment });
        } catch (error) {
            console.error('Error al agregar comentario:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getCommentsByEvent(req, res) {
        try {
            const comments = await commentService.getCommentsByEvent(req.params.eventId);
            res.json(comments);
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = commentController;
