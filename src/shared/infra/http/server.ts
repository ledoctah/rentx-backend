/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import router from './routes';
import errorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
