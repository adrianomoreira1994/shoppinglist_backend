import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

class Index {
  private express: express.Application;
  private connectionString: any;

  constructor() {
    this.express = express();
    this.connectionString = process.env.CONNECTION_STRING;

    this.middlewares();
    this.database();
    this.routes();
  }

  public getServer(): express.Application {
    return this.express;
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private database(): void {
    mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default Index;
