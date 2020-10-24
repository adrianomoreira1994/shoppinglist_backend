import ICreateCategorytDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  create(data: ICreateCategorytDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
  remove(category: Category): Promise<void>;
}
