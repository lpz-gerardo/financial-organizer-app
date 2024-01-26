import express from 'express';
import {
    addMember,
    getMembers,
    editMember,
} from '../controllers/memberController.js';
const router = express.Router();

router.post('/', addMember);

router.get('/', getMembers);

router.put('/:currentName', editMember);

export default router;