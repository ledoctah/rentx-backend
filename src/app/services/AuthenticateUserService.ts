import { sign } from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import authConfig from '../config/auth';
import User from '../entities/User';
import BcryptHashProvider from '../provider/BCryptHashProvider';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface IResponse {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({
    email,
    password,
    rememberMe = false,
  }: IRequest): Promise<IResponse> {
    console.log(rememberMe);
    const usersRepository = new UsersRepository();
    const hashProvider = new BcryptHashProvider();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const isPasswordCorrect = await hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: rememberMe ? '7d' : expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
