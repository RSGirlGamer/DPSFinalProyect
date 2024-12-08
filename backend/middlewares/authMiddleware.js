const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: true, message: 'Acceso denegado. Token requerido.' });
    }

    try {
        const extractedToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        // Validar el token usando el secreto
        const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ error: true, message: 'Token inválido o expirado.' });
    }
};
