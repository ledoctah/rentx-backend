import { getRepository, Repository } from 'typeorm';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';

import Car from '../entities/Car';

export default class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async create(carData: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create(carData);

    await this.ormRepository.save(car);

    return car;
  }

  async save(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }
}
