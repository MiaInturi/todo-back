import { Schema, model } from 'mongoose';
import { MODELS_NAMES } from '@utils/constants';

export interface User {
  nickname: string;
  password: string;
  registrationTime: number;
}

const UserSchema = new Schema({
  nickname: { type: Schema.Types.String, unique: true, required: true },
  password: { type: Schema.Types.String, required: true },
  registrationTime: { type: Schema.Types.Number, required: true },
});

export const UserModel = model<User>(MODELS_NAMES.USER, UserSchema);
