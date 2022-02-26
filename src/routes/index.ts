import type { Router } from 'express';
import { Router as RouterClass } from 'express';

import { UsersController } from '../controllers/users/users-controller';
import { getValidateForUsersController } from '../controllers/users/users-validator';

export const router: Router = new (RouterClass as any)();
router.post('/registration', getValidateForUsersController('registration'), UsersController.registration);
router.get('/login', UsersController.login);
