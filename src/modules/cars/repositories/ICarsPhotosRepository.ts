import CarPhoto from '../infra/typeorm/entities/CarPhoto';

export default interface ICarsPhotosRepository {
  create(photo_url: string, car_id: string): Promise<CarPhoto>;
}
