import { Router } from 'express';
import ProductController from './controllers/ProductController';

const routes = Router();
const productController = new ProductController();

routes.get('/products', productController.index);
routes.post('/products', productController.create);
routes.put('/products/:id', productController.update);
routes.delete('/products/:id', productController.delete);

export default routes;
