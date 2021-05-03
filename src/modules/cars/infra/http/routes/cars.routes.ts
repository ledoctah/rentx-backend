import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CarsController from '@modules/cars/infra/http/controllers/CarsController';

const upload = multer(uploadConfig.multer);

const router = Router();

const carsController = new CarsController();

router.get('/', carsController.index);

router.post('/', upload.array('photo', 6), carsController.create);

export default router;
