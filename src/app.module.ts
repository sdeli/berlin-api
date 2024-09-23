import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordModule } from './word/word.module';
import { WordController } from './word/word.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SenseListModule } from './sense-list/sense-list.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    WordModule,
    SenseListModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
    }),
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
    AuthModule,
    UsersModule,
    SenseListModule,
  ],
  controllers: [WordController, AppController],
  providers: [AppService],
})
export class AppModule { }
