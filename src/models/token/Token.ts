import { Types, Schema, model } from 'mongoose';
import { MODELS_NAMES } from '@utils/constants';

export interface Token {
  user: Types.ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: MODELS_NAMES.USER, required: true },
  refreshToken: { type: Schema.Types.String, required: true },
});

export const TokenModel = model<Token>(MODELS_NAMES.TOKEN, TokenSchema);
