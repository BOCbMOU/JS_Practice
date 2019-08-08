import express from 'express';
import { getAllOrders, getOrderById } from '../controllers/orderController';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/orderId:orderId', getOrderById);

export default router;