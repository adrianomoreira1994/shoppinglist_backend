import AppError from '@shared/errors/AppError';
import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import UpdateProductService from './UpdateProductService';
import CreateProductService from './CreateProductService';

let fakeProductRepository: FakeProductRepository;
let updateProductService: UpdateProductService;
let createProductService: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    updateProductService = new UpdateProductService(fakeProductRepository);
    createProductService = new CreateProductService(fakeProductRepository);
  });

  it('should be able to update product', async () => {
    const product = await createProductService.execute({
      name: 'Detergente',
      brand: 'Ype',
      price: 1.89,
      quantity: 6,
      category_id: 'category-id',
      user_id: 'user-id',
    });

    const updatedProduct = await updateProductService.execute({
      product_id: product.id,
      name: 'Deter',
      brand: 'Minuano',
      quantity: 8,
      category_id: 'nova-categoria',
      price: 2.29,
    });

    expect(updatedProduct.name).toEqual('Deter');
    expect(updatedProduct.brand).toEqual('Minuano');
    expect(updatedProduct.price).toEqual(2.29);
    expect(updatedProduct.quantity).toEqual(8);
    expect(updatedProduct.category_id).toEqual('nova-categoria');
  });

  it('should not be able to update a product that does not exists', async () => {
    await expect(
      updateProductService.execute({
        product_id: 'non-exists',
        name: 'Deter',
        brand: 'Minuano',
        quantity: 8,
        category_id: 'nova-categoria',
        price: 2.29,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
