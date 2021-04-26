import { v4 as uuid } from 'uuid';

import ICreateCarDTO from '../../dtos/ICreateCarDTO';
import ICarsRepository from '../ICarsRepository';

import Car from '../../infra/typeorm/entities/Car';

export default class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async create(carData: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(
      car,
      {
        id: uuid(),
      },
      carData,
    );

    this.cars.push(car);

    return car;
  }

  async save(car: Car): Promise<Car> {
    const foundIndex = this.cars.findIndex(item => item.id === car.id);

    this.cars[foundIndex] = car;

    return car;
  }
}
