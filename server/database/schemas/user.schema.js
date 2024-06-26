import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

export default userSchema;