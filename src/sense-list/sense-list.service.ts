import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SenseList } from './entities/sense-list.entity';
import { Repository } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { DefaultListNamesDto } from 'src/auth/dto';
import { User } from 'src/users/entities/user.entity';

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

  async createYourWordsListIfNotExists(user: User) {
    const yourWordsList = await this.repo.findOne({
      where: {
        title: DefaultListNamesDto.YourWords,
        belongsTo: { id: user.id },
      },
    });

    if (yourWordsList) return yourWordsList;
    const newList = new SenseList();
    newList.title = DefaultListNamesDto.YourWords;
    newList.belongsTo = user;

    return await this.repo.save(newList);
  }
}
