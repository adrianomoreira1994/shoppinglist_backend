import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductRepository from '../repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  product_id: string;
}

@injectable()
class RemoveProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }

  public async execute({
    product_id
  }: IRequest): Promise<boolean> {
    const productExists = await this.productRepository.findById(
      product_id
    );

    if (!productExists) {
      throw new AppError(
        'There is already a product registered with that name and that brand',
      );
    }

    const productDeleted = await this.productRepository.remove(productExists);

    return productDeleted;
  }
}

export default RemoveProductService;
