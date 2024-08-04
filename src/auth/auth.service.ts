// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { LoginDto, UserDataDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async validateUser(username: string, pass: string): Promise<UserDataDto> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { username, id } = user;

      return {
        username,
        id: id.toString(),
      };
    }
    return null;
  }

  async login(user: UserDataDto) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }), // Refresh token valid for 7 days
    };
  }

  async refreshToken(oldToken: string) {
    const decoded = this.jwtService.verify(oldToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    const payload = { username: decoded.username, sub: decoded.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string): Promise<UserDataDto> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(username, hashedPassword);

    return {
      id: user.id,
      username: user.username,
    };
  }
}
