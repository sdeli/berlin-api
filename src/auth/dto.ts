import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SenseLine } from 'src/word/entities/sense-line.entity';

// src/auth/dto/register.dto.ts
export interface RegisterDto {
  username: string;
  password: string;
}

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
}

export class LoginDto {
  readonly username: string;
  readonly password: string;
}

export interface TokensDto {
  access_token: string;
  refresh_token: string;
}

export interface UserDataDto {
  username: string;
  id: string;
}

export interface LoggedInUserDto {
  user: UserDataDto;
  tokens: TokensDto;
}

export class CreateSenseListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  senseLines?: SenseLine[];

  @IsString()
  userId: string;
}

export class FetchSenseListByUserIdDto {
  @IsString()
  userId: string;
}

export class SenseListDto {
  @IsString()
  @IsNotEmpty()
  ID: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateSenseListDto extends PartialType(CreateSenseListDto) { }

export enum DefaultListNamesDto {
  SearchHistory = 'Search History',
  YourWords = 'Your Words',
}
