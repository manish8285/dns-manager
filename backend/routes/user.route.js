import express from 'express';
import { getAllUsers, registerUser, signInUser } from '../controllers/user.controller.js';
import { verifyUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/all',verifyUser, getAllUsers);
router.post('/register', registerUser);
router.post('/signin', signInUser);

export default router;
