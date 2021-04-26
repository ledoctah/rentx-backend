import { getRepository, Repository } from 'typeorm';

import IFuelsRepository from '@modules/fuels/repositories/IFuelsRepository';

import Fuel from '../entities/Fuel';

export default class FuelsRepository implements IFuelsRepository {
  private ormRepository: Repository<Fuel>;

  constructor() {
    this.ormRepository = getRepository(Fuel);
  }

  async findById(id: string): Promise<Fuel | undefined> {
    const fuel = await this.ormRepository.findOne(id);

    return fuel;
  }
}
