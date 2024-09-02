import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { WordService } from './word.service';
import { Module } from '@nestjs/common';
import { Sense } from './entities/sense.entity';
import { SenseLine } from './entities/sense-line.entity';
import { SenseList } from '../sense-list/entities/sense-list.entity';
import { SenseLineService } from './sense-line.service';

@Module({
  imports: [
    WordModule,
    TypeOrmModule.forFeature([Word, Sense, SenseLine, SenseList]),
  ],
  controllers: [WordController],
  providers: [WordService, SenseLineService],
  exports: [WordService, SenseLineService],
})
export class WordModule { }
