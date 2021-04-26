import { getRepository, Repository } from 'typeorm';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Company from '../entities/Company';

export default class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  async findById(id: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(id);

    return company;
  }
}
