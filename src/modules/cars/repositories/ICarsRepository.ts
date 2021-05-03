import ICreateCarDTO from '../dtos/ICreateCarDTO';
import IFindCarFiltersDTO from '../dtos/IFindCarFiltersDTO';

import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  findWithFilters(filters: IFindCarFiltersDTO): Promise<Car[]>;
  create(carData: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
}
