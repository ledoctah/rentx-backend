/* eslint-disable no-console */
import express from 'express';

import router from './routes';
import errorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
