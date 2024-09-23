import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenseListController } from './sense-list.controller';
import { SenseList } from './entities/sense-list.entity';
import { SenseListService } from './sense-list.service';
import { UsersModule } from 'src/users/users.module';
import { WordModule } from 'src/word/word.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([SenseList]),
    UsersModule,
    forwardRef(() => WordModule),
  ],
  controllers: [SenseListController],
  providers: [SenseListService],
  exports: [SenseListService],
})
export class SenseListModule { }
