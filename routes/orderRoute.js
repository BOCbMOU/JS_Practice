import express from 'express';
import {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/id:id', getOrderById);
router.post('/', addNewOrder);
router.put('/id:id', updateOrder);
router.delete('/delete/id:id', deleteOrder);

export default router;
