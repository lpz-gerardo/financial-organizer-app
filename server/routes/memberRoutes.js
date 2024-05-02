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
    .post(userVerification, addMember)
    .put(userVerification, editMember)
    .delete(userVerification, removeMember);

export default router;