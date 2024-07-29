import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { WordController } from './video.controller';
import { WordService } from './word.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [WordModule, TypeOrmModule.forFeature([Word])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule { }
