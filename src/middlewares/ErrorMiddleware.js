const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
    ErrorHandler.handler.handleError(err);
    res.json({
        message: err.message,
        code: err.code,
    });
}

module.exports = ErrorMiddleware;