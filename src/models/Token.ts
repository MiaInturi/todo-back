import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import { MODELS_NAMES } from '../utils/constants';

const SchemaTypes = Schema.Types;

export interface Token {
  user: Types.ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema({
  user: { type: SchemaTypes.ObjectId, ref: MODELS_NAMES.USER, required: true },
  refreshToken: { type: SchemaTypes.String, required: true },
});

export const TokenModel = model<Token>(MODELS_NAMES.TOKEN, TokenSchema);
