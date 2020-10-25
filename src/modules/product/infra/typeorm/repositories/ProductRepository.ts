import { getRepository, Repository } from 'typeorm';

import ICreateProductDTO from '@modules/product/dtos/ICreateProductDTO';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async findByBrandAndName(
    name: string,
    brand: string,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { brand, name },
    });

    return product;
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return await this.ormRepository.save(product);
  }

  public async remove(product: Product): Promise<boolean> {
    const deletedProduct = await this.ormRepository.remove(product);
    const p = await this.ormRepository.save(deletedProduct);

    if (p) return true;

    return false;
  }
}

export default ProductRepository;
