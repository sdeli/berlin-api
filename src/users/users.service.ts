import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public repo: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.repo.findOne({ where: { username } });
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }
}
