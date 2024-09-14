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
    let word: Word[] = [];
    if (query && !!query.text.length) {
      word = await this.crudService.find(query);
    } else {
      console.log('not found');
      return [];
    }
    return word;
  }
}
