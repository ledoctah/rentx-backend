import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import ICarsPhotosRepository from '@modules/cars/repositories/ICarsPhotosRepository';
import CarsPhotosRepository from '@modules/cars/infra/typeorm/repositories/CarsPhotosRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import FuelsRepository from '@modules/fuels/infra/typeorm/repositories/FuelsRepository';
import IFuelsRepository from '@modules/fuels/repositories/IFuelsRepository';
import TransmissionsRepository from '@modules/transmissions/infra/typeorm/repositories/TransmissionsRepository';
import ITransmissionsRepository from '@modules/transmissions/repositories/ITransmissionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsPhotosRepository>(
  'CarsPhotosRepository',
  CarsPhotosRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IFuelsRepository>(
  'FuelsRepository',
  FuelsRepository,
);

container.registerSingleton<ITransmissionsRepository>(
  'TransmissionsRepository',
  TransmissionsRepository,
);
