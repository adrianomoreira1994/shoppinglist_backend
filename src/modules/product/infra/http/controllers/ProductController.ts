import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '@modules/product/services/CreateProductService';

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, quantity, brand, price, category_id } = request.body;
    const user_id = request.user.id;

    const productService = container.resolve(CreateProductService);

    const product = await productService.execute({
      name,
      quantity,
      price,
      brand,
      category_id,
      user_id,
    });

    return response.json(product);
  }
}

export default ProductController;
