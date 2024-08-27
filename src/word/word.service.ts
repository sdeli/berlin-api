import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Word } from './entities/word.entity';
import { CrudService } from '@nestjs-library/crud';
import { Like, Repository } from 'typeorm';
import { GetItemsDto } from './word.dtos';

@Injectable()
export class WordService extends CrudService<Word> {
  constructor(
    @InjectRepository(Word)
    public repo: Repository<Word>,
  ) {
    super(repo);
  }

  async find(filter?: GetItemsDto): Promise<Word[]> {
    const queryOptions: any = {
      relations: ['senses', 'senses.lines'], // Ensure this matches the property name
    };
    if (filter) {
      const needsExactMatch = filter.limit === 1;
      if (needsExactMatch) {
        queryOptions.where = {
          text: filter.text,
        };
      } else {
        queryOptions.where = {
          text: Like(`%${filter.text}%`),
        };
      }
      if (filter.limit) {
        queryOptions.take = filter.limit;
      }
    } else {
      queryOptions.take = 20;
    }

    return this.repo.find(queryOptions);
  }
}
