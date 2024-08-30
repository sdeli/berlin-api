import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SenseList } from './entities/sense-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SenseListService extends TypeOrmCrudService<SenseList> {
  constructor(@InjectRepository(SenseList) public repo: Repository<SenseList>) {
    super(repo);
  }
}
