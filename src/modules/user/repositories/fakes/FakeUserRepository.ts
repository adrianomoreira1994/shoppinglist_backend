import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '../IUserRepository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);
    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    if (findIndex >= 0) {
      this.users[findIndex] = user;
    }

    return this.users[findIndex];
  }
}

export default FakeUserRepository;
