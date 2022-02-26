import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { MiddlewareInjector } from './middlewares';
import { mongooseRuntimeError } from './utils/handlers/error';

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on('error', mongooseRuntimeError);

    const app = express();
    MiddlewareInjector.addMiddlewares(app);

    app.listen(5000, () => console.log('start on 5000'));
  } catch (e) {
    console.error(e);
  }
};

start();
