import express from 'express';
import { addAccount, getAccounts } from '../controllers/accountController.js';

const router = express.Router();

router.post('/', addAccount);

router.get('/', getAccounts);

export default router;