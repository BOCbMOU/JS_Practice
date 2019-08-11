import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/id:id', createProduct);
router.get('/id:id', getProductById);
router.delete('/delete/id:id', deleteProduct);

export default router;
