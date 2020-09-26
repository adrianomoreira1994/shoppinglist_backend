import { uuid } from 'uuidv4';

import ICreateProductDTO from '@modules/product/dtos/ICreateProductDTO';
import IProductRepository from '../IProductRepository';
import Product from '@modules/product/infra/typeorm/entities/Product';

class FakeProductRepository implements IProductRepository {
  private products: Product[] = [];

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id);

    return product;
  }

  public async findByBrandAndName(
    name: string,
    brand: string,
  ): Promise<Product | undefined> {
    const product = this.products.find(
      product => product.brand === brand && product.name === name,
    );

    return product;
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, data);
    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    if (findIndex >= 0) {
      this.products[findIndex] = product;
    }

    return this.products[findIndex];
  }
}

export default FakeProductRepository;
