import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.userId);

    delete user.password;

    return response.json(user);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const createdUser = await createUserService.excute({
      name,
      email,
      password,
    });

    return response.json(createdUser);
  }

  public async uploadAvatar(
    request: Request,
    response: Response
  ): Promise<Response> {
    const avatarService = new UpdateUserAvatarService();

    const user = await avatarService.execute({
      user_id: request.userId,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

export default new UserController();
