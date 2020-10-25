import AppError from '@shared/errors/AppError';
import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';
import RemoveProductService from './RemoveProductService';

let fakeProductRepository: FakeProductRepository;
let createProductService: CreateProductService;
let removeProductService: RemoveProductService;

describe('RemoveProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
    removeProductService = new RemoveProductService(fakeProductRepository);
  });

  it('should be able to delete a existing product', async () => {
    const product = await createProductService.execute({
      name: 'Detergente',
      brand: 'Ype',
      price: 1.89,
      quantity: 6,
      category_id: 'category-id',
      user_id: 'user-id',
    });

    const deleted = await removeProductService.execute({
      product_id: product.id
    });

    expect(deleted).toEqual(true);
  });

  it('should not be able to delete a existing product when non-existing id', async () => {
    await expect(removeProductService.execute({
      product_id: 'non-existing'
    })).rejects.toBeInstanceOf(AppError);
  });
});
