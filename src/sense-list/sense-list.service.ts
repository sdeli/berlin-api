import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SenseList } from './entities/sense-list.entity';
import { Repository } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class SenseListService extends TypeOrmCrudService<SenseList> {
  constructor(@InjectRepository(SenseList) public repo: Repository<SenseList>) {
    super(repo);
  }

  async deleteOneById(id: string): Promise<void> {
    const entity = await this.repo.findOne({ where: { ID: id } });
    if (!entity) {
      throw new NotFoundException(`SenseList with ID ${id} not found`);
    }
    await this.repo.remove(entity);
  }
}
