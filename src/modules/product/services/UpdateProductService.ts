import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductRepository from '../repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  product_id: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  category_id: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    product_id,
    name,
    brand,
    quantity,
    price,
    category_id,
  }: IRequest): Promise<Product> {
    var product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product is not exists');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.brand = brand;
    product.category_id = category_id;

    return await this.productRepository.save(product);
  }
}

export default UpdateProductService;
