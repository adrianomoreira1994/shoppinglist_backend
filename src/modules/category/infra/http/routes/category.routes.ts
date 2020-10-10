import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';

const productsRouter = Router();

const categoryController = new CategoryController();

productsRouter.post('/', categoryController.create);

export default productsRouter;
