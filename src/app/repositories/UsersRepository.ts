import { EntityRepository, getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../entities/User';

@EntityRepository()
export default class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
