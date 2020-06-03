import { Document } from 'mongoose';

interface IProduct extends Document {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

export default IProduct;
