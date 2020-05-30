import { Router } from 'express';
import productController from './controllers/ProductController';

const routes = new Router();

routes.get('/products', productController.index);
routes.post('/products', productController.create);
routes.put('/products/:id', productController.update);
routes.delete('/products/:id', productController.delete);

export default routes;
