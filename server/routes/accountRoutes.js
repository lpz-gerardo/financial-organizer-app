import express from 'express';
import {
    addAccount,
    getAccounts,
    editAccount,
    removeAccount
} from '../controllers/accountController.js';

const router = express.Router();

router.post('/', addAccount);

router.get('/', getAccounts);

router.put('/:id', editAccount);

router.delete('/:id', removeAccount);

export default router;