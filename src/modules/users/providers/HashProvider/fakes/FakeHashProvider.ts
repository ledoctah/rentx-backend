import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return password === hashedPassword;
  }
}
