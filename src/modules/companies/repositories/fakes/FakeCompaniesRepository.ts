import Company from '@modules/companies/infra/typeorm/entities/Company';
import ICompaniesRepository from '../ICompaniesRepository';

export default class FakeCompaniesRepository implements ICompaniesRepository {
  private companies: Company[] = [
    {
      id: '1',
      name: 'Company 1',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  async findById(id: string): Promise<Company | undefined> {
    const found = this.companies.find(company => company.id === id);

    return found;
  }
}
