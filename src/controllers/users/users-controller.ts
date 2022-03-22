import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { UsersService } from '../../services/users/users-service';
import { ApiError } from '../../errors/api-error/ApiError';
import { MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_DAY, COOKIES_NAMES, SUCCESS_CODES } from '../../utils/constants';

export class UsersController {
  public static async registration(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [validationError] = errors.array({ onlyFirstError: true });
      next(ApiError.createBadRequestError(validationError.msg));
      return;
    }

    try {
      const { nickname, password } = req.body as { nickname: string; password: string; };
      const { user, accessToken, refreshToken } = await UsersService.registration(nickname, password);

      res.cookie(COOKIES_NAMES.ACCESS_TOKEN, accessToken, { maxAge: 30 * MILLISECONDS_IN_DAY, httpOnly: true });
      res.cookie(COOKIES_NAMES.REFRESH_TOKEN, refreshToken, { maxAge: 15 * MILLISECONDS_IN_MINUTE, httpOnly: true });
      res.status(SUCCESS_CODES.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiError.createBadRequestError('Incorrect username or password'));
      return;
    }

    try {
      const { nickname, password } = req.body as { nickname: string; password: string; };
      const { user, accessToken, refreshToken } = await UsersService.login(nickname, password);

      res.cookie(COOKIES_NAMES.ACCESS_TOKEN, accessToken, { maxAge: 30 * MILLISECONDS_IN_DAY, httpOnly: true });
      res.cookie(COOKIES_NAMES.REFRESH_TOKEN, refreshToken, { maxAge: 15 * MILLISECONDS_IN_MINUTE, httpOnly: true });
      res.status(SUCCESS_CODES.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}
