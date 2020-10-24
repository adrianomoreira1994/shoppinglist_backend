import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import CreateCategoryService from './CreateCategoryService';
import UpdateCategoryService from './UpdateCategoryService';

let fakeCategoryRepository: FakeCategoryRepository;
let updateCategoryService: UpdateCategoryService;
let createCategoryService: CreateCategoryService;

describe('UpdateCategory', () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    updateCategoryService = new UpdateCategoryService(fakeCategoryRepository);
    createCategoryService = new CreateCategoryService(fakeCategoryRepository);
  });

  it('should not be able update category when non-existing', async () => {
    await expect(
      updateCategoryService.execute({
        category_id: 'a4sdasdas',
        name: 'Limpeza',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able update category with same name', async () => {
    const category1 = await createCategoryService.execute({
      name: 'Limpeza',
      user_id: 'user-id-1'
    });

    const category2 = await createCategoryService.execute({
      name: 'Doces',
      user_id: 'user-id-2'
    });

    await expect(
      updateCategoryService.execute({
        category_id: category2.id,
        name: 'Limpeza',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should be able update a category', async () => {
    const category = await createCategoryService.execute({
      name: 'Limpeza',
      user_id: 'user-id-1'
    });


    const updatedCategory = await updateCategoryService.execute({
      category_id: category.id,
      name: 'Laticínios',
    });

    expect(updatedCategory.name).toEqual('Laticínios');
  });
});
