import Company from '../infra/typeorm/entities/Company';

export default interface ICompaniesRepository {
  findById(id: string): Promise<Company | undefined>;
}
