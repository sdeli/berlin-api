// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedInUserDto, LoginDto, TokensDto, UserDataDto } from './dto';
import { RegisterDataAuthGuard } from './register-data-auth.guard';
import { SenseList } from 'src/sense-list/entities/sense-list.entity';
import { SenseListService } from 'src/sense-list/sense-list.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private senseListService: SenseListService,
  ) { }

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
    const { username, password } = loginDto;
    const user = await this.authService.getUserByName(username);

    if (user) {
      throw new ConflictException('User with the provided name already exists');
    }

    const newUser = await this.authService.register(username, password);
    const newList = new SenseList();
    newList.title = 'Search History';
    newList.belongsTo = newUser;
    await this.senseListService.repo.save(newList);

    return {
      id: newUser.id,
      username: newUser.username,
    };
  }
}
