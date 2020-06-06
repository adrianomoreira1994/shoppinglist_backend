import { Request, Response, NextFunction } from 'express';
import Auth from '../config/Auth';

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: 'Token is not provider' });
  }

  const [, token] = authHeader?.split(' ');

  try {
    const decodedToken = await Auth.decodedToken(String(token));
    request.userId = decodedToken.id;

    return next();
  } catch (error) {
    return response.status(401).send({ error: 'Token is not provider' });
  }
}
