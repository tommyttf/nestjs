import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export interface IUser {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<IUser> {
    return this.users.find((user) => user.username === username);
  }
}
