import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/', UserController.postUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUserById);
router.put('/:id', UserController.updateUserById);

export default router;