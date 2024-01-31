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

const addAccount = async (request, response) => {
    try {
        if (!request.body.accountType
            || !request.body.memberName
            || !request.body.accountName
            || !request.body.creditLimit
            || !request.body.debt
            || !request.body.monthlyPayment
            || !request.body.annualPercentRate
            || !request.body.paymentDay)
            {
                return response.status(400).send({
                    message: 'Missing data.'
                });
            }

            const member = await findMember({ name: request.body.memberName });
            if (!member) {
                return response.status(404).send({ message: 'Selected member does not exist.'});
            }

            const newAccount = {
                name: request.body.accountName,
                accountType: request.body.accountType,
                creditLimit: request.body.creditLimit,
                startingDebt: request.body.debt,
                remainingDebt: request.body.debt,
                minimumMonthlyPayment: request.body.monthlyPayment,
                annualPercentRate: request.body.annualPercentRate,
                paymentDay: request.body.paymentDay,
                memberName: request.body.memberName,
            };

            const account = await createAccount(newAccount);
            member.account.push(account);
            member.debt = Number(member.debt) + Number(account.startingDebt);
            member.monthlyPayment = Number(member.monthlyPayment) + Number(account.minimumMonthlyPayment);
            await updateMember(member);

            return response.status(201).send(account);

    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

const getAccounts = async (request, response) => {
    try {
        const accounts = await findAccounts();
        return response.status(200).json({
            count: accounts.length,
            data: accounts,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

const editAccount = async (request, response) => {
    try {
        const { id } = request.params;
        const account = await findAccount(id);
        if (!account) {
            return response.status(404).send({ message: 'Account does not exist.' });
        }

        const member = await findMember({ name: account.memberName });
        if (!member) {
            return response.status(404).send({ message: 'Selected member does not exist.' });
        }
        member.debt = member.debt - (account.remainingDebt - request.body.remainingDebt);
        member.monthlyPayment = member.monthlyPayment - (account.minimumMonthlyPayment - request.body.monthlyPayment);
        await updateMember(member);

        account.remainingDebt = request.body.remainingDebt;
        account.minimumMonthlyPayment = request.body.monthlyPayment;
        account.annualPercentRate = request.body.annualPercentRate;
        await updateAccount(account);

        return response.status(200).send({ message: 'Account data updated.' });

    } catch (error) {
        console.log(error);
        return response.status(200).send({ message: error.message });
    }
}

const removeAccount = async(request, response) => {
    try {
        const { id } = request.params;
        const conditions = { _id: id };
        const account = await findAccount(id);
        if (!account) {
            return response.status(404).send({ message: 'Accound does not exist.' });
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
            return response.status(404).send({ message: 'Account does not exist.' });
        }

        return response.status(200).send({
            message: 'Account was successfully deleted.'
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message })
    }
}

export { addAccount, getAccounts, editAccount, removeAccount };