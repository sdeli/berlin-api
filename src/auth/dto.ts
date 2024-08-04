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
