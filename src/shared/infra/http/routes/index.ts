import { Router, Request, Response } from 'express';

import users from '@modules/users/infra/http/routes/users.routes';
import cars from '@modules/cars/infra/http/routes/cars.routes';
import session from '@modules/users/infra/http/routes/session.routes';

const router = Router();

router.use('/users', users);
router.use('/cars', cars);
router.use('/session', session);

router.get('/', (_: Request, response: Response) => {
  return response.json({
    message: 'Welcome to RentX API',
  });
});

export default router;
