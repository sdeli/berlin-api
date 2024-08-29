import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjs-library/crud';
import { WordService } from './word.service';
import { Word } from './entities/word.entity';
import { GetItemsDto, PostSenseListDto } from './word.dtos';
import { SenseList } from './entities/sense-list.entity';

@Crud({ entity: SenseList })
@Controller('word')
export class SenseListController implements CrudController<SenseList> {
  constructor(public readonly crudService: WordService) { }

  @Get()
  async findAll(dto: PostSenseListDto): Promise<Word[]> {
    console.log('findAll');
    if (query && !!query.text.length) {
      console.log('found');
      var word = await this.crudService.find(query);
    } else {
      console.log('not found');
      return [];
    }
    return word;
  }
}
