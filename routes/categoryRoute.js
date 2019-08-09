import express from 'express';
import { getAllCategories, getCategoryById, addNewCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/id:id', getCategoryById);
router.post('/', addNewCategory);

export default router;
