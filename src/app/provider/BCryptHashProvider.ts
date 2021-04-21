import { hash } from 'bcryptjs';

export default class BcryptHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
