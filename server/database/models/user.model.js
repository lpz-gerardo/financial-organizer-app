import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema.js';

const User = mongoose.Model('User', userSchema);

export {
    User,
}