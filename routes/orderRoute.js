import express from 'express';
import { getAllOrders, getOrderById, addNewOrder } from '../controllers/orderController';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/id:id', getOrderById);
router.post('/', addNewOrder);

export default router;