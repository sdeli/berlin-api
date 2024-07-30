import { IsString, IsOptional } from 'class-validator';

export class GetItemsDto {
  @IsString()
  @IsOptional() // Make the query parameter optional
  readonly filter?: string;
}
