// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// Register
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: 'User already exists' });

        const user = await User.create({ username, email, password });
        const token = generateToken(user);

        res.status(201).json({ user: { id: user._id, username, email }, token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password)))
        return res.status(401).json({ msg: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ user: { id: user._id, username: user.username, email }, token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
