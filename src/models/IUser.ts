import { Document } from 'mongoose';

interface IUser extends Document {
  firstname: string;
  lastname: string;
  document: string;
  email: string;
  password: string;
  checkPassword: (this: IUser, password: string) => Promise<Boolean>;
}

export default IUser;
