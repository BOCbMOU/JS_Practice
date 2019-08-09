import express from 'express';
import { getAllManufactures, getManufactureById, addNewManufacture } from '../controllers/manufactureController';

const router = express.Router();

router.get('/', getAllManufactures);
router.get('/id:id', getManufactureById);
router.post('/', addNewManufacture);

export default router;
