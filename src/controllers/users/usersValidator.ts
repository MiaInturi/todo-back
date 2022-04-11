import { body } from 'express-validator';

import { UsersController } from '@controllers/users/usersController';
import { ApiError } from '@errors/api/apiError';

export const getValidateForUsersController = (usersControllerMethods: StaticMethods<typeof UsersController>) => {
  switch (usersControllerMethods) {
    case 'registration':
    case 'login': {
      return [
        body('nickname')
          .exists().withMessage({
            messagePath: 'error.validation.required',
            params: { parameter: 'nickname' },
          }).bail()
          .isString().withMessage({
            messagePath: 'error.validation.isString',
            params: { parameter: 'nickname' },
          }).bail()
          .notEmpty().withMessage({
            messagePath: 'error.validation.notEmpty',
            params: { parameter: 'nickname' },
          }).bail()
          .isLength({ min: 4 }).withMessage({
            messagePath: 'error.validation.minLength',
            params: { parameter: 'nickname', minLength: 4 },
          }).bail()
          .isLength({ max: 16 }).withMessage({
            messagePath: 'error.validation.maxLength',
            params: { parameter: 'nickname', maxLength: 16 },
          }),
        body('password')
          .exists().withMessage({
            messagePath: 'error.validation.required',
            params: { parameter: 'password' },
          }).bail()
          .isString().withMessage({
            messagePath: 'error.validation.isString',
            params: { parameter: 'password' },
          }).bail()
          .notEmpty().withMessage({
            messagePath: 'error.validation.notEmpty',
            params: { parameter: 'password' },
          }).bail()
          .isLength({ min: 8 }).withMessage({
            messagePath: 'error.validation.minLength',
            params: { parameter: 'password', minLength: 8 },
          }).bail()
          .isLength({ max: 32 }).withMessage({
            messagePath: 'error.validation.maxLength',
            params: { parameter: 'password', maxLength: 32 },
          }),
      ];
    }
    default: {
      throw ApiError.createBadRequestError('error.client.badRequest.unknownMethod');
    }
  }
};
