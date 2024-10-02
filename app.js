const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./src/utils/ErrorHandler');
const ErrorMiddleware = require('./src/middlewares/ErrorMiddleware');

// Set up the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust the first proxy
app.set('trust proxy', true);

// Allow cross-origin requests
app.use(cors());

// Require our routes into the application.
require('./src/routers/routers')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.'
}));

// Handle errors
app.use(ErrorMiddleware);

module.exports = app;