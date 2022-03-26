import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import i18nHttpMiddleware from 'i18next-http-middleware';

import i18nextInstance from './utils/i18n/instance/instance';
import { MiddlewareInjector } from './middlewares';
import { applicationConnectError, mongooseRuntimeError, mongooseDisconnectError } from './utils/handlers/error/error';

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('error', mongooseRuntimeError);
    mongoose.connection.on('disconnected', mongooseDisconnectError);

    const app = express();
    app.use(i18nHttpMiddleware.handle(i18nextInstance));
    MiddlewareInjector.addMiddlewares(app);

    app.listen(process.env.PORT, () => console.log(`start application on port ${process.env.PORT}`));
  } catch (error) {
    applicationConnectError(error);
  }
};

start();
