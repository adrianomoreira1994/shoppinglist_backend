import { Router } from 'express';
import multer from 'multer';

import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

import uploadConfig from '../config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', UserController.store);
userRouter.get('/', AuthMiddleware, UserController.index);
userRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  UserController.uploadAvatar
);

export default userRouter;
