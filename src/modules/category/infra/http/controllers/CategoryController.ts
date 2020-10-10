import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '@modules/product/services/CreateProductService';

class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ok: true});
  }
}

export default CategoryController;
