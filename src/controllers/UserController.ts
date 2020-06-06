import { Request, Response } from 'express';
import User from '../schemas/UserSchema';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const users = await User.find({});

      return response.status(200).send(users);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { firstname, lastname, email, document, password } = request.body;

      const created = await User.create({
        firstname,
        lastname,
        email,
        document,
        password,
      });

      return response.status(201).send(created);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      await User.findOneAndDelete({ _id: id });

      return response.status(200).send();
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export default UserController;
