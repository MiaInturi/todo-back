import type { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import i18nHttpMiddleware from 'i18next-http-middleware';

import i18nextInstance from '../utils/i18n/instance/instance';
import { router as usersRouter } from '../routes/users/users';
import { apiErrorMiddleware, failErrorMiddleware } from './error/errorMiddleware';

export class MiddlewareInjector {
  private static addUtilsMiddlewares(app: Express) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(i18nHttpMiddleware.handle(i18nextInstance));
  }

  private static addRouteMiddlewares(app: Express) {
    app.use('/api/users', usersRouter);
  }

  private static addErrorMiddlewares(app: Express) {
    app.use(apiErrorMiddleware);
    app.use(failErrorMiddleware);
  }

  public static addMiddlewares(app: Express) {
    MiddlewareInjector.addUtilsMiddlewares(app);
    MiddlewareInjector.addRouteMiddlewares(app);
    MiddlewareInjector.addErrorMiddlewares(app);
  }
}
