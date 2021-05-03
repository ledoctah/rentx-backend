import { Readable } from 'stream';

import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository';
import CreateCarService from '@modules/cars/services/CreateCarService';
import FindCarsService from '@modules/cars/services/FindCarsService';
import FakeCarsPhotosRepository from '@modules/cars/repositories/fakes/FakeCarsPhotosRepository';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeFuelsRepository from '@modules/fuels/repositories/fakes/FakeFuelsRepository';
import FakeTransmissionsRepository from '@modules/transmissions/repositories/fakes/FakeTranmissionsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeCarsRepository: FakeCarsRepository;
let findCars: FindCarsService;
let createCar: CreateCarService;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeFuelsRepository: FakeFuelsRepository;
let fakeTransmissionsRepository: FakeTransmissionsRepository;

const files: Express.Multer.File[] = [
  {
    fieldname: 'photo',
    originalname: 'car.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'destination',
    filename: 'car.png',
    path: 'destination/car.png',
    size: 22213,
    buffer: Buffer.from(''),
    stream: Readable.from(''),
  },
];

const carDefaultValues = {
  top_speedKM: 120,
  acceleration: 10,
  power: 80,
  capacity: 5,
  about: 'This car is a test',
  company_id: '1',
  fuel_id: '1',
  transmission_id: '1',
  files,
};

const registeredCars = [
  {
    ...carDefaultValues,
    name: 'Car 1',
    daily_price: 180,
  },
  {
    ...carDefaultValues,
    name: 'Car 1',
    daily_price: 180,
  },
  {
    ...carDefaultValues,
    name: 'Car 2',
    daily_price: 120,
  },
  {
    ...carDefaultValues,
    name: 'Car 3',
    daily_price: 240,
  },
  {
    ...carDefaultValues,
    name: 'Car 4',
    daily_price: 150,
  },
  {
    ...carDefaultValues,
    name: 'Car 5',
    daily_price: 200,
  },
];

describe('FindCarService', () => {
  beforeAll(async () => {
    const fakeCarsPhotosRepository = new FakeCarsPhotosRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeFuelsRepository = new FakeFuelsRepository();
    fakeTransmissionsRepository = new FakeTransmissionsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(
      fakeCarsRepository,
      fakeCarsPhotosRepository,
      fakeCompaniesRepository,
      fakeFuelsRepository,
      fakeTransmissionsRepository,
      fakeStorageProvider,
    );

    await Promise.all(
      registeredCars.map(async car => {
        return createCar.execute(car);
      }),
    );
  });

  beforeEach(async () => {
    findCars = new FindCarsService(
      fakeCarsRepository,
      fakeCompaniesRepository,
      fakeFuelsRepository,
      fakeTransmissionsRepository,
    );
  });

  it('should be able to list all cars', async () => {
    const cars = await findCars.execute({});

    expect(cars).toHaveLength(cars.length);
  });

  it('should filter cars by passing filter name', async () => {
    const cars = await findCars.execute({
      name: registeredCars[0].name,
    });

    const total = registeredCars.filter(
      car => car.name === registeredCars[0].name,
    ).length;

    expect(cars).toHaveLength(total);
  });

  it('should filter cars by passing filter min_price and max_price', async () => {
    const min_price = 120;
    const max_price = 180;

    const cars = await findCars.execute({
      min_price,
      max_price,
    });

    const total = registeredCars.filter(
      car => car.daily_price >= min_price && car.daily_price <= max_price,
    ).length;

    expect(cars).toHaveLength(total);
  });

  it('should not be able to list cars by passing an invalid company_id', async () => {
    const company_id = 'invalid_id';

    await expect(
      findCars.execute({
        company_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list cars by passing an invalid fuel_id', async () => {
    const fuel_id = 'invalid_id';

    await expect(
      findCars.execute({
        fuel_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list cars by passing an invalid transmission_id', async () => {
    const transmission_id = 'invalid_id';

    await expect(
      findCars.execute({
        transmission_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list by pages', async () => {
    const page1 = await findCars.execute({
      page: 1,
      cars_per_page: 2,
    });

    const page2 = await findCars.execute({
      page: 2,
      cars_per_page: 3,
    });

    expect(page1).toHaveLength(2);
    expect(page2).toHaveLength(3);
  });

  it('should not be able to list more than 50 cars per page', async () => {
    await expect(
      findCars.execute({
        page: 1,
        cars_per_page: 60,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
