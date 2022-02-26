import bcrypt from 'bcrypt';

import { UserModel } from '../models/User';
import { TokensService } from './tokens-service';
import { ApiError } from '../errors/api-error/ApiError';
import { UserDto } from '../dtos/UserDto';

export class UsersService {
  public static async registration(nickname: string, password: string) {
    // nickname is unique
    const isUserAlreadyExist = await UserModel.exists({ nickname });
    if (isUserAlreadyExist) throw ApiError.createBadRequestError(`Nickname ${nickname} already used`);

    const passwordHash = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT_ROUNDS));
    const registrationTime = new Date().getTime();
    const user = await UserModel.create({ nickname, password: passwordHash, registrationTime });

    const userDto = new UserDto(user);
    const { accessToken, refreshToken } = TokensService.generateTokens(userDto.getId());
    await TokensService.saveRefreshToken(userDto.getId(), refreshToken);

    return { user: userDto, accessToken, refreshToken };
  }
}
