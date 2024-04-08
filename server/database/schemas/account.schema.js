import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["credit", "loan"],
        required: true,
    },
    creditLimit: {
        type: Number,
        min: 0,
        required: true,
    },
    startingDebt: {
        type: Number,
        min: 0,
        required: true,
    },
    remainingDebt: {
        type: Number,
        min: 0,
        required: true,
    },
    minimumMonthlyPayment: {
        type: Number,
        min: 0,
        required: true,
    },
    annualPercentRate: {
        type: Number,
        min: 0,
        required: true,
    },
    paymentDay: {
        type: Number,
        min: 1,
        max: 31,
        required: true,
    },
    remainingPayments: {
        type: Number,
        min: 0
    },
    lengthOfLoan: {
        type: Number,
        min: 0,
    },
    memberName: {
        type: String,
        required: true,
    },
    memberId: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
    },
});

export default accountSchema;