import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/user.model.js';

const userVerification = (request, response) => {
    const token = request.cookies.token;
    if (!token) {
        return response.send({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
        if (error) {
            return response.send({ status: false });
        } else {
            const user = await User.findById(data.id)
            if (user) {
                return response.send({ status: true, user: user.username });
            } else {
                return response.send({ status: false });
            }
        }
    });
}

export {
    userVerification,
}