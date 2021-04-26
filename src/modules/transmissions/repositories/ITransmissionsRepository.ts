import Transmission from '../infra/typeorm/entities/Transmission';

export default interface ITransmissionsRepository {
  findById(id: string): Promise<Transmission | undefined>;
}
