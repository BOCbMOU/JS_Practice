import express from 'express';
import {
  getAllComments,
  getCommentById,
  getCommentsByProductId,
  getCommentsByUserId,
  addNewComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllComments);
router.get('/id:id', getCommentById);
router.get('/productId:productId', getCommentsByProductId);
router.get('/userId:userId', getCommentsByUserId);
router.post('/', addNewComment);
router.put('/id:id', updateComment);
router.delete('/delete/id:id', deleteComment);

export default router;
