import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Word } from './entities/word.entity';
import { CrudService } from '@nestjs-library/crud';
import { Like, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { AddWordDto, WordFilterDto } from './word.dtos';
import { getPropName } from 'src/libs/functions';

@Injectable()
export class WordService extends CrudService<Word> {
  constructor(
    @InjectRepository(Word)
    public repo: Repository<Word>,
  ) {
    super(repo);
  }

  async find(filter: WordFilterDto, user: User): Promise<Word[]> {
    const typesafety = new Word();
    typesafety.text = 'typesafety';
    typesafety.belongsTo = user;

    const queryBuilder = this.repo
      .createQueryBuilder('word')
      .leftJoinAndSelect('word.senses', 'sense')
      .leftJoinAndSelect('sense.lines', 'line');

    const needsExactMatch = filter.limit === 1;

    const _word = Word.name.toLocaleLowerCase(); // should print: Word
    const _textCol = getPropName(typesafety, typesafety.text); // should print: text
    const _belongstoCol = getPropName(typesafety, typesafety.belongsTo); // should print: belongsTo

    if (needsExactMatch) {
      const sqlWhere = `${_word}.${_textCol} = :${_textCol}`; // should print: 'word.text = :text'
      queryBuilder.where(sqlWhere, { text: filter.text });
    } else {
      const sqlWhere = `${_word}.${_textCol} LIKE :${_textCol}`; // should print: 'word.text LIKE :text'
      queryBuilder.where(sqlWhere, {
        text: `%${filter.text}%`,
      });
    }

    const sqlAndWhere = `(${_word}.${_belongstoCol}Id = :userId OR ${_word}.${_belongstoCol}Id IS NULL)`; // should print: '(word.belongsToId = :userId OR word.belongsToId IS NULL)'
    queryBuilder.andWhere(sqlAndWhere, { userId: user.id });
    if (filter.limit) {
      queryBuilder.take(filter.limit);
    }
    queryBuilder.take(20);

    return queryBuilder.getMany();
  }
}
