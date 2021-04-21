import { Router, Request, Response } from 'express';

import users from './users';
import session from './session';

const router = Router();

router.use('/users', users);
router.use('/session', session);

router.get('/', (_: Request, response: Response) => {
  return response.json({
    message: 'Welcome to RentX API',
  });
});

export default router;
