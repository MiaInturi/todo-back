import type { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { usersRouter } from '@routers/users/usersRouter';
import { i18nMiddleware } from '@middlewares/i18n/i18nMiddleware';
import { apiErrorMiddleware, failErrorMiddleware } from '@middlewares/error/errorMiddleware';

export class MainMiddleware {
  private static addUtilsMiddlewares(app: Express) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(i18nMiddleware);
  }

  private static addRouteMiddlewares(app: Express) {
    app.use('/api/users', usersRouter);
  }

  private static addErrorMiddlewares(app: Express) {
    app.use(apiErrorMiddleware);
    app.use(failErrorMiddleware);
  }

  public static addMiddlewares(app: Express) {
    this.addUtilsMiddlewares(app);
    this.addRouteMiddlewares(app);
    this.addErrorMiddlewares(app);
  }
}
