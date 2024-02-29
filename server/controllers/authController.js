import bcrypt from 'bcrypt';
import User from '../database/models/user.model.js';
import { createSecretToken } from '../utils/SecretToken.js';

const Signup = async (request, response, next) => {
   try {
        if (!request.body.username || !request.body.password) {
            return response.status(400).send({ message: 'Missing username or password' });
        }
   } catch (error) {
        return response.status(500).send({ message: error });
   }
}

export {
    Signup,
}