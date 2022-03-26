import { Types } from 'mongoose';

import type { User } from '../../models/user/User';

export class UserDto {
  private readonly id: string;

  private readonly nickname: string;

  private readonly registrationTime: number;

  public constructor(user: User & { _id: Types.ObjectId }) {
    this.id = user._id.toString();
    this.nickname = user.nickname;
    this.registrationTime = user.registrationTime;
  }

  public getId() {
    return this.id;
  }

  public getNickname() {
    return this.nickname;
  }

  public getRegistrationTime() {
    return this.registrationTime;
  }
}
