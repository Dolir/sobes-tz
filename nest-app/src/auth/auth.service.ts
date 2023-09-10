import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthType, UserType } from '@slice';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async verifyToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  async validateUser(name: string, password: string) {
    const user = await this.usersService.findOne(name);
    if (!user) throw new NotFoundException();

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signIn(signInDto: AuthType.SignInRequestDto) {
    const user = await this.validateUser(signInDto.name, signInDto.password);

    return this.generateTokens(user);
  }

  async signUp({ name, password }: AuthType.SignUpRequestDto) {
    const user = await this.usersService.findOne(name);
    if (user)
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    const hashedPassword = await this.hashPassword(password, 10);

    const createdUser = await this.usersService.createOne({
      name,
      password: hashedPassword,
    });

    return this.generateTokens(createdUser);
  }

  async hashPassword(password: string, saltRounds: number) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async generateTokens(user: UserType.UserDto) {
    const payload: AuthType.JwtTokenType = { userId: user.id, name: user.name };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
