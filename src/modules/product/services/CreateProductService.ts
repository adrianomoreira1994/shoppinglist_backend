import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductRepository from '../repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  brand: string;
  quantity: number;
  price: number;
  category_id: string;
  user_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    name,
    brand,
    quantity,
    price,
    category_id,
    user_id,
  }: IRequest): Promise<Product> {
    var productExists = await this.productRepository.findByBrandAndName(
      name,
      brand,
    );

    if (productExists) {
      throw new AppError(
        'There is already a product registered with that name and that brand',
      );
    }

    var product = await this.productRepository.create({
      name,
      brand,
      quantity,
      price,
      category_id,
      user_id,
    });

    return product;
  }
}

export default CreateProductService;
