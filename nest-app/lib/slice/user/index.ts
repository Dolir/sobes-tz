import { Exclude, Expose } from 'class-transformer';

export class UserSchema {
  name: string;
  password: string;
}

export class UserDto implements UserSchema {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  password: string;
}
@Exclude()
export class UserFindResponseDto extends Array<UserDto> {}
@Exclude()
export class UserCreateRequestDto {}
@Exclude()
export class UserCreateResponseDto extends UserDto {}
