import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryRepository from '../repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<Category> {
    var categoryExists = await this.categoryRepository.findByName(name);

    if (categoryExists) {
      throw new AppError(
        'There is already a category registered with that name',
      );
    }

    var category = await this.categoryRepository.create({
      name,
      user_id,
    });

    return category;
  }
}

export default CreateCategoryService;
