import { container } from 'tsyringe';
import '@modules/users/providers';

import './providers';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

import IProductRepository from '@modules/product/repositories/IProductRepository';
import ProductRepository from '@modules/product/infra/typeorm/repositories/ProductRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
