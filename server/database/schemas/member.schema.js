import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    debt: {
        type: Number,
        default: 0,
        min: 0,
    },
    monthlyPayment: {
        type: Number,
        default: 0,
        min: 0,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    accounts: {
        type: [mongoose.Types.ObjectId],
        ref: 'Account'
    },
}, { timestamps: true });

export default memberSchema;