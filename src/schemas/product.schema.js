import { Schema, model } from 'mongoose';

const Product = Schema(
  {
    title: String,
    quantity: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default model('Product', Product);
