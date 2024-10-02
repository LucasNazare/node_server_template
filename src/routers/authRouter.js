const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const { newId } = require('../utils/Helper');
const { APIError, ERRORS } = require('../utils/APIError');

router.post('/register', (req, res) => {
    try {
        const ip = req.ip;
        res.send(`Register route. IP: ${ip}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Something broke!');
    }
});

router.post('/login', (req, res) => {
    throw new APIError(ERRORS.INVALID_TOKEN, req);
    res.send(`New ID: ${newId(2)}`);
});

router.post('/change-password', (req, res) => {
    res.send('Change password route');
});

module.exports = router;