import { Router } from 'express';
import UserController from "../controllers/User.Controller.js";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.findUserById);
router.post('/', UserController.validate('Post'), UserController.createUser);
router.patch('/:id', UserController.validate('Patch'), UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);

export default router;
