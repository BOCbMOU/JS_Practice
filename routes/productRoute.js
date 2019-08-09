import express from 'express';
import { getAllProducts, getProductById, modifyProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', modifyProduct);
router.put('/id:id', modifyProduct);
router.get('/id:id', getProductById);

export default router;