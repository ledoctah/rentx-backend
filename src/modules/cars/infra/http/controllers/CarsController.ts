import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarService from '@modules/cars/services/CreateCarService';

export default class CarsController {
  async create(request: Request, response: Response): Promise<Response> {
    const createCar = container.resolve(CreateCarService);

    const {
      name,
      top_speedKM,
      acceleration,
      power,
      about,
      capacity,
      daily_price,
      company_id,
      fuel_id,
      transmission_id,
    } = request.body;

    const files = request.files as Express.Multer.File[];

    const car = await createCar.execute({
      name,
      top_speedKM,
      acceleration,
      power,
      about,
      capacity,
      daily_price,
      company_id,
      fuel_id,
      transmission_id,
      files,
    });

    return response.json(car);
  }
}
