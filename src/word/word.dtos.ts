import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class GetItemsDto {
  @IsString()
  @IsOptional() // Make the query parameter optional
  readonly text?: string;

  @IsNumber()
  @IsOptional() // Make the query parameter optional
  readonly limit?: number;
}

export class PostSenseListDto {
  @IsString()
  title: string;
  @IsString()
  userid: string;
}

export class AddWordDto {
  @IsString()
  userId: string;
  @IsString()
  germanWord: string;
  @IsString()
  englishWord: string;
  @IsArray()
  @IsString({ each: true })
  listIds: string[];
}
