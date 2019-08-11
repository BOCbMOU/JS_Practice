import express from 'express';
import { getAllUsers, getUserById, addNewUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/id:id', getUserById);
router.post('/', addNewUser);
router.put('/id:id', updateUser);
router.delete('/delete/id:id', deleteUser);

export default router;
