import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SenseLine } from './entities/sense-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SenseLineService extends TypeOrmCrudService<SenseLine> {
  constructor(@InjectRepository(SenseLine) public repo: Repository<SenseLine>) {
    super(repo);
  }
}
