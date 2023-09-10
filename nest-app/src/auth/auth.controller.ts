import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType } from '@slice';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtToken } from './jwt.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  signUp(@Body() signUpDto: AuthType.SignUpRequestDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signIn')
  async signIn(@Body() signInDto: AuthType.SignInRequestDto) {
    return this.authService.signIn(signInDto);
  }
  @ApiBearerAuth()
  @Get('check')
  async check(@JwtToken() jwtToken: string) {
    return this.authService.verifyToken(jwtToken);
  }
}
