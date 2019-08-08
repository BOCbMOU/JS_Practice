import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/id:id', getProductById);

export default router;