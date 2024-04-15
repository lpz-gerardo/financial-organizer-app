import jwt from 'jsonwebtoken';

const createSecretToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        domain: 'localhost',
        path: '/',
        maxAge: 10 * 24 * 60 * 60 * 1000
    });
};

export default createSecretToken;