import { body } from 'express-validator';

import { UsersController } from './users-controller';
import { ApiError } from '../../errors/api-error/ApiError';

export const getValidateForUsersController = (usersControllerMethods: StaticMethods<typeof UsersController>) => {
  switch (usersControllerMethods) {
    case 'registration': {
      return [
        body('nickname')
          .exists().withMessage('Параметр nickname является обязательным')
          .isString().withMessage('Параметр nickname должен быть строкой')
          .isLength({ min: 4, max: 16 }).withMessage((value: string) => {
            if (value.length < 4) return 'Параметр nickname должен содержать 4 или более символов';
            if (value.length > 16) return 'Параметр nickname должен содержать 16 или менее символов';
            throw ApiError.createBadRequestError();
          }),
        body('password')
          .exists().withMessage('Параметр password является обязательным')
          .isString().withMessage('Параметр password должен быть строкой')
          .isLength({ min: 4, max: 64 }).withMessage((value: string) => {
            if (value.length < 4) return 'Параметр password должен содержать 4 или более символов';
            if (value.length > 64) return 'Параметр password должен содержать 64 или менее символов';
            throw ApiError.createBadRequestError();
          }),
      ];
    }
    case 'login': {
      return [
        body('userName', 'userName doesnt exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled']),
      ];
    }
    default: {
      throw ApiError.createBadRequestError('Ошибка - неизвестный запрос');
    }
  }
};
