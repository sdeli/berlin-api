import { UsersService } from './../users/users.service';
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserDataDto } from './dto';
import { User } from 'src/users/entities/user.entity';

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

  async getUserByName(username: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    return user;
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

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersService.createUser(username, hashedPassword);
  }
}
