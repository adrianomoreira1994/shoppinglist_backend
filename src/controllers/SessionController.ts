import { Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateService = new AuthenticateUserService();

    const { user, token } = await authenticateService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default new SessionController();
