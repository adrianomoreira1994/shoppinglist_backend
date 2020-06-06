import { Request, Response } from 'express';
import User from '../schemas/UserSchema';
import Auth from '../config/Auth';

class SessionController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).send({ error: 'User does not exists' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).send({ error: 'Password is invalid' });
    }

    const userData = {
      id: user.id,
      email: user.email,
      password: user.password,
      token: await Auth.generateToken(user.id),
    };

    return response.status(200).send(userData);
  }
}

export default SessionController;
