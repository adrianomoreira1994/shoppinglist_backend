import { Router } from 'express';
import usersRoutes from '@modules/user/infra/http/routes/users.routes';
import productRoutes from '@modules/product/infra/http/routes/products.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productRoutes);

export default routes;
