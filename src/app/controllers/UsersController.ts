import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, driver_license, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      driver_license,
      password,
    });

    return response.json(user);
  }
}
