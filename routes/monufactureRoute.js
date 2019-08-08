import express from 'express';
import { getAllManufactures, getManufactureById } from '../controllers/manufactureController';

const router = express.Router();

router.get('/', getAllManufactures);
router.get('/id:id', getManufactureById);

export default router;
