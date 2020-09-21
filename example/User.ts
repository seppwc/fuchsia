import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', UserSchema);
