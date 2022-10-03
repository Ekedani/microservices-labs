import { Router } from 'express';
import CommentController from "../controllers/Comment.Controller.js";
const router = Router();

router.get('/post/:id/comments', CommentController.getAllUsers);
router.post('/post/:id/', CommentController.findUserById);
router.delete('/post/:id/comments/:id', CommentController.deleteUserById);

export default router;