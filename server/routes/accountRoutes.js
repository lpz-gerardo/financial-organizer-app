import express from 'express';
import { Account } from '../database/models/account.model.js';

const router = express.Router();

router.post('/', async (request, response) => {
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

            const account = await Account.create(newAccount);

            return response.status(201).send(account);

    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

router.get('/', async (request, response) => {
    try {
        const accounts = await Account.find({}).exec();
        return response.status(200).json({
            count: accounts.length,
            data: accounts,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

export default router;