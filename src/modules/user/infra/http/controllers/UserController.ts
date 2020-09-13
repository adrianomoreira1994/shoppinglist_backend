import { container } from 'tsyringe';
import { Request, Response } from 'express';

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

    return response.json(createdUser);
  }
}

export default UserController;
