import { getRepository, Repository } from 'typeorm';

import Category from '../entities/Category';
import ICreateCategorytDTO from '@modules/category/dtos/ICreateCategoryDTO';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
    });

    return category;
  }

  public async create(data: ICreateCategorytDTO): Promise<Category> {
    const category = this.ormRepository.create(data);
    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return await this.ormRepository.save(category);
  }

  public async remove(category: Category): Promise<void> {
    const deletedCategory = await this.ormRepository.remove(category);
    await this.save(deletedCategory);
  }
}

export default CategoryRepository;
