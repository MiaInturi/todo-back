import type { Request, Response, NextFunction } from 'express';

import { ApiError } from '@errors/api/apiError';
import { SERVER_STATUSES } from '@utils/constants';

export const apiErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: req.t(err.message, err.errorParams) });
    return;
  }
  next(err);
};

export const failErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(SERVER_STATUSES.INTERNAL_ERROR).json({ message: req.t('error.server.internal') });
};
