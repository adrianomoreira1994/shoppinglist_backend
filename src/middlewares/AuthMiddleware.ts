import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

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
    const decodedToken = jwt.verify(token, String(process.env.SECRET));

    console.log(decodedToken);

    const { id } = decodedToken as TokenPayload;

    request.userId = id;

    return next();
  } catch (error) {
    return response.status(401).send({ error: 'Token is not provider' });
  }
}
