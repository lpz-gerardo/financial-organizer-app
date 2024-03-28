import jwt from 'jsonwebtoken';

const createSecretToken = (response, userId) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });

    response.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 10 * 24 * 60 * 60 * 1000
    });
};

export {
    createSecretToken
}