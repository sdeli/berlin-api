import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    public repo: Repository<Word>,
  ) { }
}
