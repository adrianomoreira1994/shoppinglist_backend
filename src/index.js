import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

class Index {
  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  database() {
    mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  routes() {
    this.express.use(routes);
  }
}

export default new Index().express;
