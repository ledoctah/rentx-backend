import { Router } from 'express';

import UsersController from '../app/controllers/UsersController';

const router = Router();

const usersController = new UsersController();

router.post('/', usersController.create);

export default router;
