import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryRepository from '../repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  category_id: string;
  name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  public async execute({ category_id, name }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category is not exists');
    }

    const categoryWithSameName = await this.categoryRepository.findByName(name);

    if (categoryWithSameName && (categoryWithSameName.id !== category_id)) {
      throw new AppError('There is already a category registered with that name')
    }

    category.name = name;

    const updatedCategory = await this.categoryRepository.save(category);

    return updatedCategory;
  }
}

export default UpdateCategoryService;
