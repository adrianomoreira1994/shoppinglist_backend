import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.excute({
      name,
      email,
      password,
    });

    return response.json(classToClass(createdUser));
  }
}

export default UserController;
