const express = require('express');
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateEventId } = require('../utils/validators');
const { errorHandler } = require('../utils/errorHandler');

const router = express.Router();

router.post('/', authenticate, eventController.createEvent);
router.get('/', authenticate, eventController.getAllEvents);
router.get('/:id', authenticate, validateEventId, eventController.getEventById);
router.put('/:id', authenticate, eventController.updateEvent);
router.delete('/:id', authenticate, eventController.deleteEvent);

router.use(errorHandler);

module.exports = router;
