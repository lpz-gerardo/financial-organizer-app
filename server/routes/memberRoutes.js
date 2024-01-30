import express from 'express';
import {
    addMember,
    getMembers,
    editMember,
    removeMember,
} from '../controllers/memberController.js';
const router = express.Router();

router.post('/', addMember);

router.get('/', getMembers);

router.put('/:currentName', editMember);

router.delete('/:name', removeMember);

export default router;