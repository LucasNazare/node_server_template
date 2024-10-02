const { level } = require("winston");

const ERRORS = {
    INVALID_CREDENTIALS: {
        code: 401,
        message: 'Email ou senha inválidos.',
        level: 'warn',
    },
    INVALID_TOKEN: {
        code: 401,
        message: 'Token inválido.',
        level: 'inspect',
    },
    MISSING_TOKEN: {
        code: 401,
        message: 'Token não encontrado.',
        level: 'inspect',
    },
    EXPIRED_TOKEN: {
        code: 401,
        message: 'Token expirado.',
        level: 'warn',
    },
    UNAUTHORIZED: {
        code: 403,
        message: 'Acesso não autorizado.',
        level: 'inspect',
    },
    NOT_FOUND: {
        code: 404,
        message: 'Recurso não encontrado.',
        level: 'warn',
    },
    INTERNAL_ERROR: {
        code: 500,
        message: 'Erro interno.',
        level: 'error',
    },
}

class APIError extends Error {
    constructor(errorType = ERRORS.INTERNAL_ERROR, req) {
        super(errorType.message); // This is to display the error message
        this.errorType = errorType; // This is to identify the type of error
        this.code = errorType.code; // This is to identify the status code
        this.level = errorType.level; // This is to identify the level of the error
        this.message = errorType.message; // This is to identify the error
        this.ip = req.headers['x-forwarded-for'] || req.ip; // This is to identify the IP address
        this.url = req.url; // This is to identify the URL
        this.method = req.method; // This is to identify the HTTP method
        this.userAgent = req.headers['user-agent']; // This is to identify the User-Agent header
        this.referer = req.headers['referer'] || 'No referer'; // This is to identify the referer
        this.isOperational = true; // This is to identify if the error is operational
        Error.captureStackTrace(this, this.constructor); // This is to capture the stack trace and display the error message
    }
}

module.exports = {
    APIError,
    ERRORS,
}