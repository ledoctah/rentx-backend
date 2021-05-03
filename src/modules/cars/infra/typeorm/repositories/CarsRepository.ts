import {
  FindOperator,
  getRepository,
  ILike,
  Repository,
  WhereExpression,
} from 'typeorm';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';

import IFindCarFiltersDTO from '@modules/cars/dtos/IFindCarFiltersDTO';
import Car from '../entities/Car';

interface IFilters {
  name?: FindOperator<string> | string;
  min_price?: number;
  max_price?: number;
  daily_price?: FindOperator<number>;
  company_id?: string;
  fuel_id?: string;
  transmission_id?: string;
}

export default class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

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

    if (filters.name) {
      filters.name = ILike(filters.name);
    }

    const found = await this.ormRepository.find({
      relations: ['carPhotos'],
      where: (qb: WhereExpression) => {
        qb.where(filters).andWhere(
          'CAST(daily_price AS INTEGER) BETWEEN :min_price AND :max_price',
          {
            min_price,
            max_price,
          },
        );
      },
      skip: (page - 1) * cars_per_page,
      take: cars_per_page,
    });

    return found;
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
