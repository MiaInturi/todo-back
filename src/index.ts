import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { MainMiddleware } from '@middlewares/main/mainMiddleware';
import { applicationConnectError, mongooseRuntimeError, mongooseDisconnectError } from '@utils/handlers/error/error';

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('error', mongooseRuntimeError);
    mongoose.connection.on('disconnected', mongooseDisconnectError);

    const app = express();
    MainMiddleware.addMiddlewares(app);

    app.listen(process.env.PORT, () => console.log(`start application on port ${process.env.PORT}`));
  } catch (error) {
    applicationConnectError(error);
  }
};

start();
