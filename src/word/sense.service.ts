import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sense } from './entities/sense.entity';

@Injectable()
export class SenseService extends TypeOrmCrudService<Sense> {
  constructor(@InjectRepository(Sense) public repo: Repository<Sense>) {
    super(repo);
  }
}
