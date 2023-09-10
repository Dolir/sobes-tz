import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class BaseAuthRequestDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  password: string;
}

export class JwtTokenType {
  userId: string;
  name: string;
}

export class BaseTokensResponseDto {
  accessToken: string;
}
@Exclude()
export class SignUpRequestDto extends BaseAuthRequestDto {}
@Exclude()
export class SignUpResponseDto extends BaseTokensResponseDto {}
@Exclude()
export class SignInRequestDto extends BaseAuthRequestDto {}
@Exclude()
export class SignInResponseDto extends BaseTokensResponseDto {}
