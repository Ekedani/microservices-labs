import { Router } from 'express';
import CommentController from "../controllers/Comment.Controller.js";

const router = Router();

router.get('/posts/:post_id/comments', CommentController.getAllComments);
router.get('/posts/:post_id/comments/:comment_id', CommentController.findCommentById);
router.post('/posts/:post_id/comments', CommentController.addComment);
router.patch('/posts/:post_id/comments/:comment_id', CommentController.updateCommentById);
router.delete('/posts/:post_id/comments/:comment_id', CommentController.deleteCommentById);

export default router;
