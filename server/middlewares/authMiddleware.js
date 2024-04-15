import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../database/models/user.model.js';

const userVerification = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            res.status(401);
            console.log('Not authorized, invalid token');
        }
    } else {
        res.status(401);
        console.log('Not authorized, no token');
    }
});

export {
    userVerification,
}