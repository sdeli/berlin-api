import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Word } from '../users/entities/word.entity';
import { CrudService } from '@nestjs-library/crud';
import { Like, Repository } from 'typeorm';

@Injectable()
export class WordService extends CrudService<Word> {
  constructor(
    @InjectRepository(Word)
    public repo: Repository<Word>,
  ) {
    super(repo);
  }

  async findAll(filter?: string): Promise<Word[]> {
    if (filter) {
      return this.repo.find({
        where: {
          title: Like(`%${filter}%`), // Use LIKE operator here
        },
      });
    }
    return this.repo.find();
  }
}
