import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const router = Router();

const usersController = new UsersController();

router.post('/', usersController.create);

export default router;
