function errorHandler(err, req, res, next) {
    console.error('🔥 Error:', err.stack);
    res.status(500).json({
        error: 'Internal server error',
        details: err.message,
    });
}

module.exports = errorHandler;
