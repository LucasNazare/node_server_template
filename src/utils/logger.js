const winston = require('winston');
const { createLogger, format, transports } = require('winston');

const customLevels = {
    levels: {
        error: 0,
        inspect: 1,
        debug: 2,
    },
    colors: {
        error: 'red',
        inspect: 'yellow',
        debug: 'green',
    },
};

const inspectFormat = format.combine(
    format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'service'] }), // Capture extra fields
    format.printf((info) => {
        return JSON.stringify({
            level: info.level,
            message: info.message, // Ensure message is included
            timestamp: info.timestamp,
            ...info.metadata  // All other fields (like code, ip, etc.)
        });
    })
);

const generalFormat = format.combine(
    format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.errors({ stack: true }),  // For handling error stack traces
    format.splat(),  // Allows string interpolation
    format.json()  // Outputs in JSON format
);

const logger = createLogger({
    levels: customLevels.levels,
    defaultMeta: { service: 'api-service' },
    transports: [
        new winston.transports.Console({ level: 'debug', format: generalFormat }), // This will log all the debug logs in the console
        new winston.transports.File({ filename: 'error.log', level: 'error', format: generalFormat }), // This will log all the error logs in error.log
        new winston.transports.File({ filename: 'inspect.log', level: 'inspect', format: inspectFormat }), // This will log all the inspect logs in inspect.log
    ],
});

winston.addColors(customLevels.colors);

module.exports = logger;