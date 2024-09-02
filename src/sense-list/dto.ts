import { IsString } from 'class-validator';
export class AddSenseToWordlistsDto {
  @IsString()
  lineId: string;
  @IsString()
  listId: string;
}
