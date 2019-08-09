import express from 'express';
import { getAllUsers, getUserById, addNewUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/id:id', getUserById);
router.post('/', addNewUser);

export default router;
