import type { Request, Response, NextFunction } from 'express';

import { ApiError } from '../../errors/api-error/ApiError';
import { SERVER_STATUSES } from '../../utils/constants';

export const apiErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  next(err);
};

export const failErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(SERVER_STATUSES.INTERNAL_ERROR).json({ message: 'Ошибка сервера' });
};
