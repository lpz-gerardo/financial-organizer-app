import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: String,
    accountType: String,
    creditLimit: Number,
    startingDebt: Number,
    remainingDebt: Number,
    minimumMonthlyPayment: Number,
    annualPercentRate: Number,
    paymentDay: Number,
    memberName: String,
    remainingPayments: Number,
    lengthOfLoan: Number,
});

export default accountSchema;