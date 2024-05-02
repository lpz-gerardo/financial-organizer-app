import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import User from '../database/models/user.model.js';
import createSecretToken from '../utils/SecretToken.js';

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({ username, password });
    if (user) {
        createSecretToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        createSecretToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
        });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User logged out' });
});


export {
    registerUser,
    loginUser,
    logoutUser,
}