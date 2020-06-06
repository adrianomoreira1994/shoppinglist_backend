import { Router } from 'express';

import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';

import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = Router();

const productController = new ProductController();
const userController = new UserController();

routes.get('/users', AuthMiddleware, userController.index);
routes.post('/users', userController.create);

routes.get('/products', AuthMiddleware, productController.index);
routes.post('/products', AuthMiddleware, productController.create);
routes.put('/products/:id', AuthMiddleware, productController.update);
routes.delete('/products/:id', AuthMiddleware, productController.delete);

export default routes;
