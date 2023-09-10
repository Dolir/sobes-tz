import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthType, TodoType } from '@slice';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/auth/user.decorator';
import { SortOrder } from 'mongoose';

@UseGuards(JwtAuthGuard)
@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  @ApiQuery({ required: false, name: 'search' })
  @ApiQuery({
    required: false,
    name: 'sortField',
    example: 'createdAt',
    enum: ['createdAt', 'done'],
  })
  @ApiQuery({
    required: false,
    name: 'sortOrder',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  async index(
    @GetUser() user: AuthType.JwtTokenType,
    @Query('search') search: string,
    @Query('sortField') sortField: string,
    @Query('sortOrder') sortOrder: SortOrder,
  ) {
    return await this.todoService.getAll(
      user.userId,
      search,
      sortField,
      sortOrder,
    );
  }

  @Get(':id')
  async find(@Param('id') id: string, @GetUser() user: AuthType.JwtTokenType) {
    const todo = await this.todoService.findOne(id, user.userId);
    if (!todo) throw new NotFoundException();
    return todo;
  }

  @Post()
  async create(
    @Body() createTodoDto: TodoType.TodoCreateRequestDto,
    @GetUser() user: AuthType.JwtTokenType,
  ) {
    return await this.todoService.create(createTodoDto, user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: TodoType.TodoUpdateRequestDto,
    @GetUser() user: AuthType.JwtTokenType,
  ) {
    const todoToUpdate = await this.todoService.findOne(id, user.userId);
    if (!todoToUpdate) throw new ForbiddenException();

    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @GetUser() user: AuthType.JwtTokenType,
  ) {
    const todoToUpdate = await this.todoService.findOne(id, user.userId);
    if (!todoToUpdate) throw new ForbiddenException();
    return await this.todoService.delete(id);
  }
}
