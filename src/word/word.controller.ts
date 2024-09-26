import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjs-library/crud';
import { WordService } from './word.service';
import { Word } from './entities/word.entity';
import { AddWordDto, WordFilterDto } from './word.dtos';
import { waitFor } from 'src/libs/functions';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { SenseService } from './sense.service';
import { Sense } from './entities/sense.entity';
import { SenseLine } from './entities/sense-line.entity';
import { SenseLineService } from './sense-line.service';
import { SenseListService } from 'src/sense-list/sense-list.service';
import { In } from 'typeorm';

@Crud({ entity: Word })
@Controller('word')
export class WordController implements CrudController<Word> {
  constructor(
    public readonly crudService: WordService,
    private configService: ConfigService,
    private usersService: UsersService,
    private senseService: SenseService,
    private senseLineService: SenseLineService,
    private senseListService: SenseListService,
  ) { }

  @Get()
  async findAll(@Query() query: WordFilterDto): Promise<Word[]> {
    if (this.configService.get<string>('ENV') === 'local') {
      await waitFor(2000);
    }
    let word: Word[] = [];
    const user = await this.usersService.repo.findOne({
      where: { id: query.userId },
    });

    word = await this.crudService.find(query, user);

    return word;
  }

  @Post()
  async addNewWord(@Body() dto: AddWordDto) {
    if (this.configService.get<string>('ENV') === 'local') {
      await waitFor(2000);
    }
    const { englishWord, germanWord, listIds, userId } = dto;
    const user = await this.usersService.repo.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException('User does not exist with id');
    }

    const newWord = new Word();
    newWord.text = germanWord;
    newWord.belongsTo = user;
    const savedWord = await this.crudService.repo.save(newWord);
    const newSense = new Sense();
    newSense.line = {
      text: germanWord,
      html: '',
    };

    newSense.word = savedWord;

    const yourWordsList =
      await this.senseListService.createYourWordsListIfNotExists(user);
    const savedSense = await this.senseService.repo.save(newSense);
    const newSenseLine = new SenseLine();
    newSenseLine.source = {
      text: germanWord,
      html: '',
    };

    newSenseLine.target = {
      text: englishWord,
      html: '',
    };

    newSenseLine.sense = savedSense;
    if (listIds.length) {
      const lists = await this.senseListService.find({
        where: {
          ID: In(listIds),
        },
        relations: ['senseLines'],
      });
      if (listIds && listIds.length) {
        newSenseLine.senseLists = lists;
      }
    }

    newSenseLine.senseLists = [...newSenseLine.senseLists, yourWordsList];
    await this.senseLineService.repo.save(newSenseLine);
  }
}
