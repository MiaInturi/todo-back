import { Schema, model } from 'mongoose';
import { MODELS_NAMES } from '../utils/constants';

const SchemaTypes = Schema.Types;

export interface User {
  nickname: string;
  password: string;
  registrationTime: number;
}

const UserSchema = new Schema({
  nickname: { type: SchemaTypes.String, unique: true, required: true },
  password: { type: SchemaTypes.String, required: true },
  registrationTime: { type: SchemaTypes.Number, required: true },
});

export const UserModel = model<User>(MODELS_NAMES.USER, UserSchema);
