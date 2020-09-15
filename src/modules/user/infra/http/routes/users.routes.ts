import { Router } from 'express';
import multer from 'multer';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.create,
);

export default usersRouter;
