const express = require('express');
const attendeeController = require('../controllers/attendeeController');
const { authenticate } = require('../middlewares/authMiddleware');
const { errorHandler } = require('../utils/errorHandler');

const router = express.Router();

router.post('/', authenticate, attendeeController.addAttendee);
router.get('/:eventId', authenticate, attendeeController.getAttendeesByEvent);

router.use(errorHandler);

module.exports = router;
