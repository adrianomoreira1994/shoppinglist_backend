import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryRepository from '../repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  category_id: string;
}

@injectable()
class RemoveCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) { }

  public async execute({ category_id }: IRequest): Promise<boolean> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category is not exists');
    }

    const deletedCategory = await this.categoryRepository.remove(category);

    return deletedCategory;
  }
}

export default RemoveCategoryService;
