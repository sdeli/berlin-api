import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';
/**
 *
 *
 * @category Idea
 */
export class CheckWordDto {
  @IsString()
  @IsUUID()
  ID: string;

  @IsOptional()
  @IsString()
  bannedAccountName?: string;

  @Transform(({ value }) => {
    if (value === 'false') return false;
    if (value === 'true') return true;
    return value;
  })
  @IsBoolean()
  isBanned: boolean;

  @Transform(({ value }) => {
    if (value === 'false') return false;
    if (value === 'true') return true;
    return value;
  })
  @IsBoolean()
  eyeChecked: boolean;

  @Transform(({ value }) => {
    if (value === 'false') return false;
    if (value === 'true') return true;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  bannAll: boolean;
}

// ID: string;
// bannedAccountName?: string;
// isBanned: boolean;
// eyeChecked: boolean;
