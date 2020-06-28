import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

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
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader?.split(' ');

  try {
    const decodedToken = jwt.verify(token, String(process.env.SECRET));

    console.log(decodedToken);

    const { id } = decodedToken as TokenPayload;

    request.userId = id;

    return next();
  } catch (error) {
    throw new AppError('Token is invalid', 401);
  }
}
