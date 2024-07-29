import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordModule } from './video/word.module';

@Module({
  imports: [
    WordModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sandor',
      password: 'pass',
      database: 'berlin',
      synchronize: true,
      // logging: false,
      entities: ['./**/entities/**/*.js'],
      migrations: ['migrations/*.js'],
      subscribers: [],
      logging: ['error'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
