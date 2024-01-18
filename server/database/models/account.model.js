import mongoose from 'mongoose';
import accountSchema from '../schemas/account.schema.js';

const Account = mongoose.model('Account', accountSchema);

const createAccount = async (newAccount) => {
    try {
        const account = await Account.create(newAccount);
        return account;
    } catch (error) {
        console.log(error);
    }
}

export { Account, createAccount };