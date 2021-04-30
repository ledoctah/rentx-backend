import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IFuelsRepository from '@modules/fuels/repositories/IFuelsRepository';
import ITransmissionsRepository from '@modules/transmissions/repositories/ITransmissionsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICarsRepository from '../repositories/ICarsRepository';
import ICarsPhotosRepository from '../repositories/ICarsPhotosRepository';

import Car from '../infra/typeorm/entities/Car';

interface IRequest {
  name: string;
  top_speedKM: number;
  acceleration: number;
  power: number;
  about: string;
  capacity: number;
  daily_price: number;
  company_id: string;
  fuel_id: string;
  transmission_id: string;
  files: Express.Multer.File[];
}

@injectable()
export default class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarsPhotosRepository')
    private carsPhotosRepository: ICarsPhotosRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('FuelsRepository')
    private fuelsRepository: IFuelsRepository,

    @inject('TransmissionsRepository')
    private transmissionsRepository: ITransmissionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    name,
    top_speedKM,
    acceleration,
    power,
    about,
    capacity,
    daily_price,
    company_id,
    fuel_id,
    transmission_id,
    files,
  }: IRequest): Promise<Car> {
    if (!files[0]) {
      throw new AppError('At least one photo needs to be provided');
    }

    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const fuel = await this.fuelsRepository.findById(fuel_id);

    if (!fuel) {
      throw new AppError('Fuel not found');
    }

    const transmission = await this.transmissionsRepository.findById(
      transmission_id,
    );

    if (!transmission) {
      throw new AppError('Transmission not found');
    }

    const filenames = await Promise.all(
      files.map(async file => {
        const filename = await this.storageProvider.saveFile(file.filename);

        return filename;
      }),
    );

    const car = await this.carsRepository.create({
      name,
      top_speedKM,
      acceleration: (acceleration * 100).toFixed(0),
      power,
      about,
      capacity,
      daily_price: (daily_price * 100).toFixed(0),
      company_id: company.id,
      fuel_id: fuel.id,
      transmission_id: transmission.id,
    });

    const carPhotos = await Promise.all(
      filenames.map(async filename => {
        return this.carsPhotosRepository.create(filename, car.id);
      }),
    );

    car.carPhotos = carPhotos;

    return car;
  }
}
