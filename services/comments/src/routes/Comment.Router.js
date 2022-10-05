import { Router } from 'express';
import CommentController from "../controllers/Comment.Controller.js";
const router = Router();

router.get('/api/posts/:id/comments', CommentController.getAllComments);
router.post('/api/posts/:id/', CommentController.findCommentById);
router.post('/api/posts/:id/new-comment', CommentController.addComment);
router.delete('/api/posts/:id/comments/:id', CommentController.deleteCommentById);

export default router;