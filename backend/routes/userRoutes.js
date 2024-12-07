const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { errorHandler } = require('../utils/errorHandler');

const router = express.Router();

router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);
router.put('/profile', authenticate, userController.updateProfile);

router.use(errorHandler);

module.exports = router;
