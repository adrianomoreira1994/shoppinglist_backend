import { Schema, model } from 'mongoose';
import IProduct from '../models/IProduct';

const Product = new Schema(
  {
    title: String,
    quantity: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>('Product', Product);
