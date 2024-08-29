import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenseListController } from './sense-list.controller';
import { SenseList } from './entities/sense-list.entity';
import { SenseListService } from './sense-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([SenseList])],
  controllers: [SenseListController],
  providers: [SenseListService],
  exports: [SenseListService],
})
export class SenseListModule { }
