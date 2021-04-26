import Fuel from '@modules/fuels/infra/typeorm/entities/Fuel';
import IFuelsRepository from '../IFuelsRepository';

export default class FakeFuelsRepository implements IFuelsRepository {
  private companies: Fuel[] = [
    {
      id: '1',
      name: 'Fuel 1',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  async findById(id: string): Promise<Fuel | undefined> {
    const found = this.companies.find(fuel => fuel.id === id);

    return found;
  }
}
