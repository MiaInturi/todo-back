import jwt from 'jsonwebtoken';
import { TokenModel } from '../../models/Token';

export class TokensService {
  public static generateTokens(userId: string) {
    const payload = { id: userId };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  public static async saveRefreshToken(userId: string, refreshToken: string) {
    const existedUserRefreshToken = await TokenModel.findOne({ user: userId });
    if (existedUserRefreshToken) {
      existedUserRefreshToken.refreshToken = refreshToken;
      const updatedUserRefreshToken = await existedUserRefreshToken.save();
      return updatedUserRefreshToken;
    }

    const createdUserRefreshToken = await TokenModel.create({ user: userId, refreshToken });
    return createdUserRefreshToken;
  }

  public static async verifyToken(accessToken: string) {
    const isAccessTokenValid = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  }
}
