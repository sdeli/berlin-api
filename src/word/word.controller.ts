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
    console.log('query');
    console.log(query);
    const noQuery =
      Object.keys(query).length === 0 && query.constructor === Object;
    console.log('noQuery');
    console.log(noQuery);
    if (noQuery) {
      return await this.crudService.findAll();
    }

    return await this.crudService.findAll(query);
  }
}
