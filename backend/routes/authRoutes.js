const express = require('express');
const { validateRegister, validateLogin } = require('../utils/validators');
const authController = require('../controllers/authController');
const { errorHandler } = require('../utils/errorHandler');

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

router.use(errorHandler);

module.exports = router;
