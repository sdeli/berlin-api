// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedInUserDto, LoginDto, TokensDto, UserDataDto } from './dto';
import { RegisterDataAuthGuard } from './register-data-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(RegisterDataAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    let tokens: TokensDto;
    if (user) {
      tokens = await this.authService.login(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }

    const loggedInUser: LoggedInUserDto = {
      user,
      tokens,
    };

    return loggedInUser;
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(RegisterDataAuthGuard)
  @Post('register')
  async register(@Body() loginDto: LoginDto): Promise<UserDataDto> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      const { username, password } = loginDto;
      return await this.authService.register(username, password);
    }

    return;
  }
}
