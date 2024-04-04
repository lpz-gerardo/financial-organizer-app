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
    },
    monthlyPayment: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'User',
    },
    accounts: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Account'
    },
}, { timestamps: true });

export default memberSchema;