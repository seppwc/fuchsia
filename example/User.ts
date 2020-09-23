import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  name: string;
  created: Date;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.model<UserModel>('User', UserSchema);
