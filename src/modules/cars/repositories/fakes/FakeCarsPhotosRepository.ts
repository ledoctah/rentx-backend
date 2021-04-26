import { v4 as uuid } from 'uuid';

import ICarsPhotosRepository from '../ICarsPhotosRepository';

import CarPhoto from '../../infra/typeorm/entities/CarPhoto';

export default class FakeCarsRepository implements ICarsPhotosRepository {
  private carsPhotos: CarPhoto[] = [];

  async create(filename: string, car_id: string): Promise<CarPhoto> {
    const car_photos = new CarPhoto();

    Object.assign(
      car_photos,
      {
        id: uuid(),
      },
      {
        filename,
        car_id,
      },
    );

    this.carsPhotos.push(car_photos);

    return car_photos;
  }
}
