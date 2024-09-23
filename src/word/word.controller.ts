import { Body, Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjs-library/crud';
import { WordService } from './word.service';
import { Word } from './entities/word.entity';
import { AddWordDto, GetItemsDto } from './word.dtos';
import { waitFor } from 'src/libs/functions';
import { ConfigService } from '@nestjs/config';

@Crud({ entity: Word })
@Controller('word')
export class WordController implements CrudController<Word> {
  constructor(
    public readonly crudService: WordService,
    private configService: ConfigService,
  ) { }

  @Get()
  async findAll(@Query() query: GetItemsDto): Promise<Word[]> {
    let word: Word[] = [];
    if (query && !!query.text.length) {
      word = await this.crudService.find(query);
    } else {
      console.log('not found');
      return [];
    }

    if (this.configService.get<string>('ENV') === 'local') {
      await waitFor(2000);
    }
    return word;
  }
}
