import express from 'express';
import {
    addMember,
    getMembers,
} from '../controllers/memberController.js';
const router = express.Router();

router.post('/', addMember);

router.get('/', getMembers);

export default router;