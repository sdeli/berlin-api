import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { WordService } from './word.service';
import { Module } from '@nestjs/common';
import { Sense } from './entities/sense.entity';
import { SenseLine } from './entities/sense-line.entity';
import { SenseList } from '../sense-list/entities/sense-list.entity';
import { SenseLineService } from './sense-line.service';
import { SenseService } from './sense.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SenseListModule } from 'src/sense-list/sense-list.module';

@Module({
  imports: [
    UsersModule,
    WordModule,
    TypeOrmModule.forFeature([Word, Sense, SenseLine, SenseList]),
    ConfigModule,
    SenseListModule,
  ],
  controllers: [WordController],
  providers: [WordService, SenseLineService, SenseService],
  exports: [WordService, SenseLineService, SenseService],
})
export class WordModule { }
