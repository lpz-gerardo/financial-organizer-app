import {
    createAccount,
    findAccount,
    findAccounts,
    updateAccount,
    deleteAccount
} from '../database/models/account.model.js';
import {
    findMember,
    updateMember,
} from '../database/models/member.model.js';

const addAccount = async (req, res) => {
    try {
        if (!req.body.accountType
            || !req.body.memberName
            || !req.body.accountName
            || !req.body.creditLimit
            || !req.body.debt
            || !req.body.monthlyPayment
            || !req.body.annualPercentRate
            || !req.body.paymentDay)
            {
                return res.status(400).json({
                    message: 'Missing data.'
                });
            }

            const member = await findMember({ name: req.body.memberName });
            if (!member) {
                return res.status(404).json({ message: 'Selected member does not exist.'});
            }

            const newAccount = {
                name: req.body.accountName,
                accountType: req.body.accountType,
                creditLimit: req.body.creditLimit,
                startingDebt: req.body.debt,
                remainingDebt: req.body.debt,
                minimumMonthlyPayment: req.body.monthlyPayment,
                annualPercentRate: req.body.annualPercentRate,
                paymentDay: req.body.paymentDay,
                memberName: req.body.memberName,
                remainingPayments: req.body.remainingPayments ?? 0,
                lengthOfLoan: req.body.lengthOfLoan ?? 0,
                memnberId: req.body.memberId,
                userId: req.body.userId,
            };

            const account = await createAccount(newAccount);
            member.accounts.push(account._id);

            member.debt = Number(member.debt) + Number(account.startingDebt);
            member.monthlyPayment = Number(member.monthlyPayment) + Number(account.minimumMonthlyPayment);
            await updateMember(member);

            res.status(201).json(account);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const getUserAccounts = async (req, res) => {
    try {
        const { userId } = req.body;
        const accounts = await findAccounts({ userId: userId });

        res.status(200).json({
            count: accounts.length,
            data: accounts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const editAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await findAccount(id);
        if (!account) {
            return res.status(404).json({ message: 'Account does not exist.' });
        }

        const member = await findMember({ name: account.memberName });
        if (!member) {
            return res.status(404).json({ message: 'Selected member does not exist.' });
        }
        member.debt = member.debt - (account.remainingDebt - req.body.remainingDebt);
        member.monthlyPayment = member.monthlyPayment - (account.minimumMonthlyPayment - req.body.monthlyPayment);
        await updateMember(member);

        account.remainingDebt = req.body.remainingDebt;
        account.minimumMonthlyPayment = req.body.monthlyPayment;
        account.annualPercentRate = req.body.annualPercentRate;
        await updateAccount(account);

        res.status(200).json({ message: 'Account data updated.' });

    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error.message });
    }
}

const removeAccount = async(req, res) => {
    try {
        const { id } = req.params;
        const conditions = { _id: id };
        const account = await findAccount(id);
        if (!account) {
            return res.status(404).json({ message: 'Accound does not exist.' });
        }

        const member = await findMember({ name: account.memberName });
        if (member) {
            member.debt = Number(member.debt) - Number(account.remainingDebt);
            member.monthlyPayment = Number(member.monthlyPayment) - Number(account.minimumMonthlyPayment);
            const index = member.account.indexOf(id);
            member.account.splice(index, 1);
            await updateMember(member);
        }

        const result = await deleteAccount(conditions);

        if (!result) {
            return res.status(404).json({ message: 'Account does not exist.' });
        }

        res.status(200).json({
            message: 'Account was successfully deleted.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export {
    addAccount,
    getUserAccounts,
    editAccount,
    removeAccount,
};