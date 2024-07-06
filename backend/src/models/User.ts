import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
