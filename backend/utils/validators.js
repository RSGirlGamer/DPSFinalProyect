const { body, param } = require('express-validator');

exports.validateRegister = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('El email debe ser válido.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),
];

exports.validateLogin = [
    body('email').isEmail().withMessage('El email debe ser válido.'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
];

exports.validateEventId = [
    param('id').isInt().withMessage('El ID del evento debe ser un número entero.'),
];
