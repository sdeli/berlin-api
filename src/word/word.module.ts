import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../users/entities/word.entity';
import { WordService } from './word.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [WordModule, TypeOrmModule.forFeature([Word])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule { }
