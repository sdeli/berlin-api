import { IsString } from 'class-validator';
export class AddSenseToWordlistsDto {
  @IsString()
  lineId: string;
  @IsString()
  listId: string;
}

export class AddWordToSearchHistoryDto {
  @IsString()
  wordId: string;
  @IsString()
  userId: string;
}
