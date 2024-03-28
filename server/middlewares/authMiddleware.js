import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../database/models/user.model.js';

const userVerification = asyncHandler(async (request, response, next) => {
    const token = request.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);

            request.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            response.status(401);
            console.log('Not authorized, invalid token');
        }
    } else {
        response.status(401);
        console.log('Not authorized, no token');
    }
});

export {
    userVerification,
}