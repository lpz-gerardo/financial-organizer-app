import express from 'express';
import { addAccount, getAccounts, removeAccount } from '../controllers/accountController.js';

const router = express.Router();

router.post('/', addAccount);

router.get('/', getAccounts);

router.delete('/:id', removeAccount);

export default router;