import { Readable } from 'stream';

import FakeCarsPhotosRepository from '@modules/cars/repositories/fakes/FakeCarsPhotosRepository';
import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeFuelsRepository from '@modules/fuels/repositories/fakes/FakeFuelsRepository';
import FakeTransmissionsRepository from '@modules/transmissions/repositories/fakes/FakeTranmissionsRepository';
import CreateCarService from '@modules/cars/services/CreateCarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeStorageProvider: FakeStorageProvider;
let fakeCarsRepository: FakeCarsRepository;
let fakeCarsPhotosRepository: FakeCarsPhotosRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeFuelsRepository: FakeFuelsRepository;
let fakeTransmissionsRepository: FakeTransmissionsRepository;
let createCar: CreateCarService;

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

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCarsPhotosRepository = new FakeCarsPhotosRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeFuelsRepository = new FakeFuelsRepository();
    fakeTransmissionsRepository = new FakeTransmissionsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createCar = new CreateCarService(
      fakeCarsRepository,
      fakeCarsPhotosRepository,
      fakeCompaniesRepository,
      fakeFuelsRepository,
      fakeTransmissionsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create new car', async () => {
    const response = await createCar.execute({
      name: 'Foo',
      top_speedKM: 120,
      acceleration: 10,
      power: 80,
      capacity: 5,
      daily_price: 280,
      about: 'This car is a test',
      company_id: '1',
      fuel_id: '1',
      transmission_id: '1',
      files,
    });

    expect(response).toHaveProperty('id');
  });

  it('should not be able to create new car without a photo', async () => {
    await expect(
      createCar.execute({
        name: 'Foo',
        top_speedKM: 120,
        acceleration: 10,
        power: 80,
        capacity: 5,
        daily_price: 280,
        about: 'This car is a test',
        company_id: 'invalid_id',
        fuel_id: '1',
        transmission_id: '1',
        files: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to provide an invalid company id', async () => {
    await expect(
      createCar.execute({
        name: 'Foo',
        top_speedKM: 120,
        acceleration: 10,
        power: 80,
        capacity: 5,
        daily_price: 280,
        about: 'This car is a test',
        company_id: 'invalid_id',
        fuel_id: '1',
        transmission_id: '1',
        files,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to provide an invalid fuel id', async () => {
    await expect(
      createCar.execute({
        name: 'Foo',
        top_speedKM: 120,
        acceleration: 10,
        power: 80,
        capacity: 5,
        daily_price: 280,
        about: 'This car is a test',
        company_id: '1',
        fuel_id: 'invalid id',
        transmission_id: '1',
        files,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to provide a invalid transmission id', async () => {
    await expect(
      createCar.execute({
        name: 'Foo',
        top_speedKM: 120,
        acceleration: 10,
        power: 80,
        capacity: 5,
        daily_price: 280,
        about: 'This car is a test',
        company_id: '1',
        fuel_id: '1',
        transmission_id: 'invalid id',
        files,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
