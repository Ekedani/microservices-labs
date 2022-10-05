import { Router } from 'express';
import CommentController from "../controllers/Comment.Controller.js";
const router = Router();

router.get('/posts/:id/comments', CommentController.getAllComments);
router.post('/posts/:id/', CommentController.findCommentById);
router.post('/posts/:id/new-comment', CommentController.addComment);
router.delete('/posts/:id/comments/:id', CommentController.deleteCommentById);

export default router;