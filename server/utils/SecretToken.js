import 'dotenv/config';
import jwt from 'jsonwebtoken';

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRES_IN,
    });
};

export {
    createSecretToken
}