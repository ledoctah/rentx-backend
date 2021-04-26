import { getRepository, Repository } from 'typeorm';

import ITransmissionsRepository from '@modules/transmissions/repositories/ITransmissionsRepository';

import Transmission from '../entities/Transmission';

export default class TransmissionsRepository
  implements ITransmissionsRepository {
  private ormRepository: Repository<Transmission>;

  constructor() {
    this.ormRepository = getRepository(Transmission);
  }

  async findById(id: string): Promise<Transmission | undefined> {
    const transmission = await this.ormRepository.findOne(id);

    return transmission;
  }
}
