import { Document } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  document: string;
  email: string;
  password: string;
}

export default IUser;
