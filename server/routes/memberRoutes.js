import express from 'express';
import {
    addMember,
    getMembers,
    editMember,
    removeMember,
} from '../controllers/memberController.js';
import { userVerification } from '../middlewares/authMiddleware.js';
const router = express.Router();

router
    .route('/')
    .get(userVerification, getMembers)
    .post(userVerification, addMember);

router.put('/:currentName', editMember);

router.delete('/:name', removeMember);

export default router;