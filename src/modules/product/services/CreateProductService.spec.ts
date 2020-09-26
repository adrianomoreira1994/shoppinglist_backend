import AppError from '@shared/errors/AppError';
import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';

let fakeProductRepository: FakeProductRepository;
let createProductService: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      name: 'Detergente',
      brand: 'Ype',
      price: 1.89,
      quantity: 6,
      category_id: 'category-id',
      user_id: 'user-id',
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a new product with the same name and brand', async () => {
    await createProductService.execute({
      name: 'Detergente',
      brand: 'Ype',
      price: 1.89,
      quantity: 6,
      category_id: 'category-id',
      user_id: 'user-id',
    });

    expect(
      await createProductService.execute({
        name: 'Detergente',
        brand: 'Ype',
        price: 1.89,
        quantity: 6,
        category_id: 'category-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
