import { Router } from 'express';
import CommentController from "../controllers/Comment.Controller.js";
const router = Router();

router.get('/api/posts/:id/comments', CommentController.getAllComments);
router.get('/api/posts/:id/comments/:id/', CommentController.findCommentById);
router.post('/api/posts/:id/comments', CommentController.validate(), CommentController.addComment);
router.delete('/api/posts/:id/comments/:id', CommentController.deleteCommentById);

export default router;
