import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  createAt?: Date;
}

const UserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('users', UserSchema);

export default User;
