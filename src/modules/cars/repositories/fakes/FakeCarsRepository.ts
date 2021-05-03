import { v4 as uuid } from 'uuid';
import { FindOperator } from 'typeorm';

import IFindCarFiltersDTO from '@modules/cars/dtos/IFindCarFiltersDTO';
import { updateTypeQueryNode } from 'typescript';
import ICreateCarDTO from '../../dtos/ICreateCarDTO';
import ICarsRepository from '../ICarsRepository';

import Car from '../../infra/typeorm/entities/Car';

interface IFilters {
  name?: FindOperator<string> | string;
  min_price?: number;
  max_price?: number;
  daily_price?: FindOperator<number>;
  company_id?: string;
  fuel_id?: string;
  transmission_id?: string;
}

export default class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async findWithFilters({
    cars_per_page,
    page,
    min_price,
    max_price,
    ...rest
  }: IFindCarFiltersDTO): Promise<Car[]> {
    const filters = rest as IFilters;

    const keys = Object.keys(filters) as Array<keyof typeof filters>;

    keys.forEach(key => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    const compareValue = (car: Car) => {
      const daily_price = Number(car.daily_price);

      if (!min_price && !max_price) {
        return true;
      }

      if (!min_price) {
        return daily_price >= <number>max_price;
      }

      if (!max_price) {
        return daily_price <= <number>min_price;
      }

      return daily_price >= min_price && daily_price <= max_price;
    };

    const skip = (page - 1) * cars_per_page;
    const take = cars_per_page + skip;

    const cars = this.cars.filter(car => {
      const valid = !keys.find(key => {
        const carKey = key as
          | 'name'
          | 'daily_price'
          | 'company_id'
          | 'fuel_id'
          | 'transmission_id';

        if (!filters[key]) {
          return false;
        }

        return (
          String(filters[key])
            .replace(/(^%)|(%$)/g, '')
            .replace(/%/g, ' ') !== car[carKey]
        );
      });

      return valid && compareValue(car);
    });

    return cars.slice(skip, take);
  }

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
