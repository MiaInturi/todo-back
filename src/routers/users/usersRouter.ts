import type { Router } from 'express';
import { Router as RouterClass } from 'express';

import { UsersController } from '@controllers/users/usersController';
import { getValidateForUsersController } from '@controllers/users/usersValidator';

export const usersRouter: Router = new (RouterClass as any)();
usersRouter.post('/registration', getValidateForUsersController('registration'), UsersController.registration);
usersRouter.post('/login', getValidateForUsersController('login'), UsersController.login);
