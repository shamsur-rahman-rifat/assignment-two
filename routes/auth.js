const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password: bcrypt.hashSync(password, 8) });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to register user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).send({ message: 'Invalid email or password' });
        } else {
            const token = jwt.sign({ id: user._id }, config.secretKey, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({ auth: true, token });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to login' });
    }
});

module.exports = router;
