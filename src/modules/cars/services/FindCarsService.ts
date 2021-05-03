import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import IFuelsRepository from '@modules/fuels/repositories/IFuelsRepository';
import ITransmissionsRepository from '@modules/transmissions/repositories/ITransmissionsRepository';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import Fuel from '@modules/fuels/infra/typeorm/entities/Fuel';
import Transmission from '@modules/transmissions/infra/typeorm/entities/Transmission';
import ICarsRepository from '../repositories/ICarsRepository';
import Car from '../infra/typeorm/entities/Car';

interface IRequest {
  name?: string;
  min_price?: number;
  max_price?: number;
  company_id?: string;
  fuel_id?: string;
  transmission_id?: string;
  page?: number;
  cars_per_page?: number;
}

type Repositories = 'companies' | 'fuels' | 'transmissions';

type FindByIdResponse =
  | Record<string, never>
  | Company
  | Fuel
  | Transmission
  | undefined;

@injectable()
export default class FindCarsService {
  private repositories = {
    companies: this.companiesRepository,
    fuels: this.fuelsRepository,
    transmissions: this.transmissionsRepository,
  };

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
    @inject('FuelsRepository')
    private fuelsRepository: IFuelsRepository,
    @inject('TransmissionsRepository')
    private transmissionsRepository: ITransmissionsRepository,
  ) {}

  private async findById(
    id: string | undefined,
    repository: Repositories,
  ): Promise<FindByIdResponse> {
    if (!id) {
      return {};
    }

    return this.repositories[repository].findById(id);
  }

  async execute({
    name,
    min_price,
    max_price,
    company_id,
    fuel_id,
    transmission_id,
    page = 1,
    cars_per_page = 12,
  }: IRequest): Promise<Car[]> {
    if (cars_per_page > 50) {
      throw new AppError('Cannot list more than 50 cars per page.');
    }

    const company = await this.findById(company_id, 'companies');

    if (!company) {
      throw new AppError('Invalid company_id');
    }

    const fuel = await this.findById(fuel_id, 'fuels');

    if (!fuel) {
      throw new AppError('Invalid fuel_id');
    }

    const transmission = await this.findById(transmission_id, 'transmissions');

    if (!transmission) {
      throw new AppError('Invalid transmission_id');
    }

    const cars = await this.carsRepository.findWithFilters({
      name: name ? `%${name.replace(/ /g, '%')}%` : name,
      min_price: min_price ? min_price * 100 : min_price,
      max_price: max_price ? max_price * 100 : max_price,
      company_id,
      fuel_id,
      transmission_id,
      page,
      cars_per_page,
    });

    return cars;
  }
}
