import { getRepository, Repository } from 'typeorm';

import ICarsPhotosRepository from '@modules/cars/repositories/ICarsPhotosRepository';

import CarPhoto from '../entities/CarPhoto';

export default class CarsPhotosRepository implements ICarsPhotosRepository {
  private ormRepository: Repository<CarPhoto>;

  constructor() {
    this.ormRepository = getRepository(CarPhoto);
  }

  async create(photo_url: string, car_id: string): Promise<CarPhoto> {
    const car = this.ormRepository.create({
      photo_url,
      car_id,
    });

    await this.ormRepository.save(car);

    return car;
  }
}
