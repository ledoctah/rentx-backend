import AppError from '../../errors/AppError';
import User from '../entities/User';
import BcryptHashProvider from '../provider/BCryptHashProvider';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  driver_license: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const hashProvider = new BcryptHashProvider();

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address is already used by another user.');
    }

    const hashedPassword = await hashProvider.generateHash(String(password));

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });

    return user;
  }
}
