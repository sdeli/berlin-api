import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetItemsDto {
  @IsString()
  @IsOptional() // Make the query parameter optional
  readonly text?: string;

  @IsNumber()
  @IsOptional() // Make the query parameter optional
  readonly limit?: number;
}
