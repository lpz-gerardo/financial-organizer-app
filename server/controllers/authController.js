import bcrypt from 'bcrypt';
import { User } from '../database/models/user.model.js';
import { createSecretToken } from '../utils/SecretToken.js';

const Signup = async (request, response, next) => {
   try {
        const { username, password, createdAt } = request.body;
        if (!username || !password) {
            return response.status(400).send({ message: 'Missing username or password' });
        }

        const doesUserExist = await User.findOne({ username });
        if (doesUserExist) {
            return response.status(400).send({ message: 'username already exists.' });
        }

        const user = await User.create({ username, password, createdAt });
        const token = createSecretToken(user._id);
        response.status(201).send({
            message: 'User signed in successfully.',
            success: true,
            token: token,
            user
        });
        next();
   } catch (error) {
        return response.status(500).send({ message: error });
   }
}

const Login = async (request, response, next) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            return response.status(400).send({ message: "All fields are required." });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(403).send({ message: "Incorrect username or password." });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return response.status(403).send({ message: "Incorrect username or password." });
        }

        const token = createSecretToken(user._id);
        response.status(201).json({ message: 'User logged in successfully', success: true, token: token });
        next();
    } catch (error) {
        return response.status(500).send({ message: error });
    }
}

export {
    Signup,
    Login,
}