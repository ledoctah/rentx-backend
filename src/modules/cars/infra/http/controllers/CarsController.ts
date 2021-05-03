import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCarService from '@modules/cars/services/CreateCarService';
import FindCarsService from '@modules/cars/services/FindCarsService';

interface IQuery {
  name?: string;
  min_price?: number;
  max_price?: number;
  company_id?: string;
  fuel_id?: string;
  transmission_id?: string;
  page?: number;
  cars_per_page?: number;
}

export default class CarsController {
  async index(request: Request, response: Response): Promise<Response> {
    const findCar = container.resolve(FindCarsService);

    const {
      name,
      min_price,
      max_price,
      company_id,
      fuel_id,
      transmission_id,
      page,
      cars_per_page,
    } = request.query as IQuery;

    const cars = await findCar.execute({
      name,
      min_price,
      max_price,
      company_id,
      fuel_id,
      transmission_id,
      page,
      cars_per_page,
    });

    return response.json(classToClass(cars));
  }

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
