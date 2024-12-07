const express = require('express');
const { addComment, getCommentsByEvent } = require('./controllers/commentController');
const router = express.Router();

router.post('/', addComment); // Agregar comentario a un evento
router.get('/:eventId', getCommentsByEvent); // Obtener comentarios de un evento

module.exports = router;
