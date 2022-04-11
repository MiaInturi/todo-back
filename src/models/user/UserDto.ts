import { Types } from 'mongoose';
import { User } from '@models/user/User';

export class UserDto {
  readonly id: string;
  readonly nickname: string;
  readonly registrationTime: number;

  public constructor(user: User & { _id: Types.ObjectId }) {
    this.id = user._id.toString();
    this.nickname = user.nickname;
    this.registrationTime = user.registrationTime;
  }
}
