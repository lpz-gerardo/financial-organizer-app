import express from 'express';
import {
    addAccount,
    getUserAccounts,
    editAccount,
    removeAccount
} from '../controllers/accountController.js';
import { userVerification } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(userVerification, getUserAccounts)
    .post(userVerification, addAccount);

router.put('/:id', editAccount);

router.delete('/:id', removeAccount);

export default router;