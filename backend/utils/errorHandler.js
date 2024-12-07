exports.errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Error interno del servidor',
    });
};
