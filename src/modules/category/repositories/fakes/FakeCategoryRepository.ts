import { uuid } from 'uuidv4';

import ICreateCategoryDTO from '@modules/category/dtos/ICreateCategoryDTO';
import ICategoryRepository from '../ICategoryRepository';
import Category from '@modules/category/infra/typeorm/entities/Category';

class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.id === id);

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid() }, data);
    this.categories.push(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    if (findIndex >= 0) {
      this.categories[findIndex] = category;
    }

    return this.categories[findIndex];
  }
}

export default FakeCategoryRepository;
