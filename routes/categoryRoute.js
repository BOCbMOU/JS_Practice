import express from 'express';
import { getAllCategories, getCategoryById, addNewCategory, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/id:id', getCategoryById);
router.post('/', addNewCategory);
router.put('/id:id', updateCategory);
router.delete('/delete/id:id', deleteCategory);

export default router;
