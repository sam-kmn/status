import { Schema, models, model } from "mongoose";

export interface IUser {
  name: String,
  email: String,
  image: String,
  password?: String,
  _id: String
}

const UserSchema = new Schema<IUser>({
  name:  {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  image: {type: String, default: '/cat.png'}
});

export default models.User || model('User', UserSchema)