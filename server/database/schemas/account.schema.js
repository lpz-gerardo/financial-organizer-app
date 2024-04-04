import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: String,
    accountType: {
        type: String,
        enum: ["credit", "loan"],
    },
    creditLimit: Number,
    startingDebt: Number,
    remainingDebt: Number,
    minimumMonthlyPayment: Number,
    annualPercentRate: Number,
    paymentDay: Number,
    memberName: String,
    remainingPayments: Number,
    lengthOfLoan: Number,
    memberId: {
        type: String,
        required: true,
    }
});

export default accountSchema;