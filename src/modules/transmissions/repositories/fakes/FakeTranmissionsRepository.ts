import Transmission from '@modules/transmissions/infra/typeorm/entities/Transmission';
import ITransmissionsRepository from '../ITransmissionsRepository';

export default class FakeTransmissionsRepository
  implements ITransmissionsRepository {
  private companies: Transmission[] = [
    {
      id: '1',
      name: 'Transmission 1',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  async findById(id: string): Promise<Transmission | undefined> {
    const found = this.companies.find(transmission => transmission.id === id);

    return found;
  }
}
