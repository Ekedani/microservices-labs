import { Router } from 'express';
import CommentController from "../controllers/Comment.Controller.js";

const router = Router();

router.get('/posts/:postID/comments', CommentController.getAllComments);
router.post('/posts/:postID/comments', CommentController.validate('Post'), CommentController.addComment);
router.delete('/posts/:postID/comments/:id', CommentController.deleteCommentById);

export default router;
