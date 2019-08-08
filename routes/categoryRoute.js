import express from 'express';
import { getAllCategories, getCategoryById } from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/id:id', getCategoryById);

export default router;