import bcrypt from 'bcrypt';

import { UserModel } from '@models/user/User';
import { UserDto } from '@models/user/UserDto';
import { TokensService } from '@services/tokens/tokensService';
import { ApiError } from '@errors/api/apiError';

export class UsersService {
  public static async registration(nickname: string, password: string) {
    const isUserExist = await UserModel.exists({ nickname });
    if (isUserExist) throw ApiError.createBadRequestError('error.client.registration.nicknameAlreadyUsed', { nickname });

    const passwordHash = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT_ROUNDS));
    const registrationTime = new Date().getTime();
    const user = await UserModel.create({ nickname, password: passwordHash, registrationTime });

    const userDto = new UserDto(user);
    const { accessToken, refreshToken } = TokensService.generateTokens(userDto.id);
    await TokensService.saveRefreshToken(userDto.id, refreshToken);

    return { user: userDto, accessToken, refreshToken };
  }

  public static async login(nickname: string, password: string) {
    const user = await UserModel.findOne({ nickname });
    if (!user) throw ApiError.createBadRequestError('error.client.login.incorrectLoginOrPassword');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw ApiError.createBadRequestError('error.client.login.incorrectLoginOrPassword');

    const userDto = new UserDto(user);
    const { accessToken, refreshToken } = TokensService.generateTokens(userDto.id);
    await TokensService.saveRefreshToken(userDto.id, refreshToken);

    return { user: userDto, accessToken, refreshToken };
  }
}
