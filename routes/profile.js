const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

        const decoded = jwt.verify(token, config.secretKey);
        const user = await User.findById(decoded.id, { password: 0 });
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch user profile' });
    }
});

module.exports = router;
