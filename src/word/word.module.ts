import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { WordService } from './word.service';
import { Module } from '@nestjs/common';
import { Sense } from './entities/sense.entity';
import { SenseLine } from './entities/sense-line.entity';
import { SenseList } from './entities/sense-list.entity';

@Module({
  imports: [
    WordModule,
    TypeOrmModule.forFeature([Word, Sense, SenseLine, SenseList]),
  ],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule { }
