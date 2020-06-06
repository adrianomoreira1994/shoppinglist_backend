import { Router } from 'express';

import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = Router();

const productController = new ProductController();
const userController = new UserController();
const sessionController = new SessionController();

routes.post('/sessions', sessionController.create);

routes.post('/users', userController.create);
routes.get('/users', AuthMiddleware, userController.index);
routes.delete('/users', AuthMiddleware, userController.remove);

routes.get('/products', AuthMiddleware, productController.index);
routes.post('/products', AuthMiddleware, productController.create);
routes.put('/products/:id', AuthMiddleware, productController.update);
routes.delete('/products/:id', AuthMiddleware, productController.delete);

export default routes;
