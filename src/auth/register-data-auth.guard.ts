import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto';

@Injectable()
export class RegisterDataAuthGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const loginDto: LoginDto = request.body;
    console.log('loginDto');
    console.log(loginDto);
    if (!loginDto || !loginDto.username || !loginDto.password) {
      console.log('true');
      console.log(true);
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('false');
    console.log(false);

    return true;
  }
}
