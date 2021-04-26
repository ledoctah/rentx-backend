import Fuel from '../infra/typeorm/entities/Fuel';

export default interface IFuelsRepository {
  findById(id: string): Promise<Fuel | undefined>;
}
