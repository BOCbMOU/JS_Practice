import express from 'express';
import { getAllProducts, getProductById, addNewProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/id:id', getProductById);
router.post('/', addNewProduct);

export default router;