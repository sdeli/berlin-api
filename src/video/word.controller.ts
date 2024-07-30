import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjs-library/crud';

import { WordService } from './word.service';
import { Word } from './entities/word.entity';
import { GetItemsDto } from './word.dtos';

@Crud({ entity: Word })
@Controller('word')
export class WordController implements CrudController<Word> {
  constructor(public readonly crudService: WordService) { }

  @Get()
  async findAll(@Query() query: GetItemsDto): Promise<Word[]> {
    const word = await this.crudService.findAll(query.filter);
    return word;
  }
}
