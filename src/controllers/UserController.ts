import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(request.userId);

      return response.json(user);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserService = new CreateUserService();

      const createdUser = await createUserService.excute({
        name,
        email,
        password,
      });

      return response.json(createdUser);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export default new UserController();
