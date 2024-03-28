import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { User } from '../database/models/user.model.js';
import { createSecretToken } from '../utils/SecretToken.js';

const registerUser = asyncHandler(async (request, response) => {
    const { username, password } = request.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
        response.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password });
    if (user) {
        createSecretToken(response, user._id);
        response.status(201).json({
            _id: user._id,
            username,
            password,
        });
    } else {
        response.status(400).json({ message: 'Invalid user data' });
    }
});

const loginUser = asyncHandler(async (request, response) => {
        const { username, password } = request.body;
        if (!username || !password) {
            response.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            createSecretToken(response, user_id);
            response.status(201).json({
                _id: user._id,
                username,
                password,
            });
        } else {
            response.status(403).json({ message: "Invalid username or password" });
        }
});

export {
    registerUser,
    loginUser,
}