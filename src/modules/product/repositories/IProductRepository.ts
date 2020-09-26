import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  findById(id: string): Promise<Product | undefined>;
  findByBrandAndName(name: string, brand: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(user: Product): Promise<Product>;
}
