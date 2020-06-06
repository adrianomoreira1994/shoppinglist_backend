import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../models/IUser';

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (this: IUser, next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

UserSchema.methods.fullname = function (this: IUser): string {
  return `${this.firstname} ${this.lastname}`;
};

UserSchema.methods.checkPassword = async function (
  this: IUser,
  password: string
): Promise<Boolean> {
  const equal = await bcrypt.compare(password, this.password);

  if (equal) return true;

  return false;
};

export default model<IUser>('User', UserSchema);
