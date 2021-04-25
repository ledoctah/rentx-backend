import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create new user', async () => {
    const response = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      driver_license: '123456789',
      password: '123456',
    });

    expect(response).toHaveProperty('id');
  });

  it('should not be able to create new user with a already registered email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: '123456789',
      password: '123456',
    });

    await expect(
      createUser.execute({
        email: user.email,
        name: 'Jane Doe',
        driver_license: '987564321',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
