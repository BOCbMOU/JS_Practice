import express from 'express';
import { getAllManufactures, getManufactureById, addNewManufacture, updateManufacture, deleteManufacture } from '../controllers/manufactureController';

const router = express.Router();

router.get('/', getAllManufactures);
router.get('/id:id', getManufactureById);
router.post('/', addNewManufacture);
router.put('/id:id', updateManufacture);
router.delete('/delete/id:id', deleteManufacture);

export default router;
