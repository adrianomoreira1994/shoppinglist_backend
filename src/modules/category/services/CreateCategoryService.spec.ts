import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    createCategoryService = new CreateCategoryService(fakeCategoryRepository);
  });

  it('should be able create a new category', async () => {
    const category = await createCategoryService.execute({
      name: 'Limpeza',
      user_id: 'id-user',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able create a new category with the same name', async () => {
    await createCategoryService.execute({
      name: 'Limpeza',
      user_id: 'id-user',
    });

    await expect(
      createCategoryService.execute({
        name: 'Limpeza',
        user_id: 'id-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
