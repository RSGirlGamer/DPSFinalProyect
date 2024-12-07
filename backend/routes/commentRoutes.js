const express = require('express');
const commentController = require('../controllers/commentController');
const { authenticate } = require('../middlewares/authMiddleware');
const { errorHandler } = require('../utils/errorHandler');

const router = express.Router();

router.post('/', authenticate, commentController.addComment);
router.get('/:eventId', authenticate, commentController.getCommentsByEvent);

router.use(errorHandler);

module.exports = router;
