import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

const port = process.env.PORT || 3333;
app.listen(port, () =>
  console.log(`🚀 Api started at http://localhost:${port}`)
);
