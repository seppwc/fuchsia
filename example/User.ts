import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  name: string;
  created: Date;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export const User = mongoose.model<UserModel>('User', UserSchema);
