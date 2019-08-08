import express from 'express';
import { getAllComments, getCommentById, getCommentsByProductId, getCommentsByUserId} from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllComments);
router.get('/id:id', getCommentById);
router.get('/productId:productId', getCommentsByProductId);
router.get('/userId:userId', getCommentsByUserId);

export default router;