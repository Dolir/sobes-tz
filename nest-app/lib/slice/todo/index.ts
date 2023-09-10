import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SortOrder } from 'mongoose';

export class TodoSchema {
  title: string;
  authorId: string;
  done?: boolean;
}

export class TodoDto implements TodoSchema {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  authorId: string;

  @Expose()
  done: boolean;

  @Expose()
  createdAt: string;
}

@Exclude()
class BaseTodoRequestDto implements Partial<TodoSchema> {
  @Expose()
  @MaxLength(256)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @Expose()
  @IsOptional()
  @ApiProperty({ default: false })
  done?: boolean;
}

@Exclude()
export class TodoGetAllResponseDto extends Array<TodoDto> {}
@Exclude()
export class TodoGetAllQueryParams {
  sortOrder?: SortOrder;
  sortField?: keyof TodoDto;
  search?: string;
}

@Exclude()
export class TodoCreateRequestDto extends BaseTodoRequestDto {}
@Exclude()
export class TodoCreateResponseDto extends TodoDto {}
@Exclude()
export class TodoUpdateRequestDto extends BaseTodoRequestDto {
  @Expose()
  id: string;
}
@Exclude()
export class TodoUpdateResponseDto extends TodoDto {}
