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

const findAccount = async (id) => {
    try {
        const account = await Account.findById(id).exec();
        return account;
    } catch (error) {
        console.log(error);
    }
}

const findAccounts = async () => {
    try {
        const accounts = await Account.find({}).exec();
        return accounts;
    } catch (error) {
        console.log(error);
    }
}

const updateAccount = async (account) => {
    try {
        account.save();
    } catch (error) {
        console.log(error);
    }
}

const deleteAccount = async (conditions) => {
    try {
        const result = await Account.where().findOneAndDelete(conditions).exec();
        return result;
    } catch (error) {
        console.log(error);
    }
}

const deleteAccounts = async (conditions) => {
    try {
        await Account.deleteMany(conditions);
    } catch (error) {
        console.log(error);
    }
}

export {
    Account,
    createAccount,
    findAccount,
    findAccounts,
    updateAccount,
    deleteAccount,
    deleteAccounts,
};