import express from 'express';
import { Signup, Login } from '../controllers/authController.js';
import { userVerification } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', userVerification);
router.post('/signup', Signup);
router.post('/login', Login);

export default router;