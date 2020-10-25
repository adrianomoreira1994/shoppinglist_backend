import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';
import RemoveCategoryService from './RemoveCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategoryService: CreateCategoryService;
let removeCategoryService: RemoveCategoryService;

describe('RemoveCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    createCategoryService = new CreateCategoryService(fakeCategoryRepository);
    removeCategoryService = new RemoveCategoryService(fakeCategoryRepository);
  });

  it('should be able to delete a existing category', async () => {
    const category = await createCategoryService.execute({
      name: 'Limpeza',
      user_id: 'user-id'
    });

    const deleted = await removeCategoryService.execute({
      category_id: category.id
    });

    expect(deleted).toEqual(true);
  });

  it('should not be able to delete a existing category when non-existing id', async () => {
    await expect(removeCategoryService.execute({
      category_id: 'non-existing'
    })).rejects.toBeInstanceOf(AppError);
  });
});
