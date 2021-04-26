import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  create(carData: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
}
