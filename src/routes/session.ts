import { Router } from 'express';

import SessionsController from '../app/controllers/SessionsController';

const router = Router();

const sessionsController = new SessionsController();

router.post('/', sessionsController.create);

export default router;
