import { Schema, model } from 'mongoose';
import IProduct from '../models/IProduct';

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>('Product', Product);
