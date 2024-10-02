const { APIError } = require("./APIError");
const logger = require("./logger");

class ErrorHandler {
    async handleError(err) {
        console.log(`Level: ${err.level}`);
        if (err instanceof APIError) {
            if (err.level === 'error') {
                // TODO: Send an email to the administrator
                logger.error({
                    message: err.message,
                    code: err.code,
                    ip: err.ip,
                    method: err.method,
                    url: err.url,
                    stack: err.stack,
                });
            }
            else if (err.level === 'warn') {
                logger.debug({
                    message: err.message,
                    code: err.code,
                    ip: err.ip,
                    method: err.method,
                    url: err.url,
                    stack: err.stack,
                });
            }
            else if (err.level === 'inspect') {
                // TODO: Send a notification to the administrator
                logger.inspect({
                    message: err.message,
                    code: err.code,
                    ip: err.ip,
                    method: err.method,  // HTTP method (e.g., GET, POST)
                    url: err.url,  // Full URL of the request
                    userAgent: err.userAgent,  // User-Agent header
                    referer: err.referer,  // Referer header
                    date: new Date().toISOString()  // Timestamp of the event
                });
            }
        }
    }

    isTrustedError(error) {
        if (error instanceof APIError) {
            return error.isOperational;
        }
        return false;
    }
}

module.exports = {
    handler: new ErrorHandler(),
}