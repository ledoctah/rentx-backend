import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_: Request, response: Response) => {
  return response.json({
    message: 'Welcome to RentX API',
  });
});

export default router;
