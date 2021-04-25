import { verify } from 'jsonwebtoken';
import { differenceInDays } from 'date-fns';

import authConfig from '@config/auth';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: '123456789',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to generate a token with bigger expire date when remember me option is marked', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: '123456789',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
      rememberMe: true,
    });

    const { secret } = authConfig.jwt;

    const token = verify(response.token, secret) as { exp: number };

    const date = new Date(token.exp * 1000);

    expect(differenceInDays(date, new Date())).toBeGreaterThan(1);
  });

  it('should not be able to authenticate with user that does not exists', async () => {
    await expect(
      authenticateUser.execute({
        email: 'nonexistinguser@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: '123456789',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
