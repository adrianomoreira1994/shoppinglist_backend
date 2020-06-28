import { Router } from 'express';
import multer from 'multer';

import SessionController from '../controllers/SessionController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

import uploadConfig from '../config/upload';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.store);

export default sessionsRouter;
