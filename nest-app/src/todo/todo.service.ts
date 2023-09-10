import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { TodoType } from '@slice';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async getAll(
    userId: string,
    search: string = '',
    sortField: string = '',
    sortOrder: SortOrder = 'asc',
  ) {
    const foundList = this.todoModel.find({
      authorId: userId,
      $or: [
        { title: { $regex: search, $options: 'i' } }, // Case-insensitive title search
      ],
    });
    if (!sortField) return foundList.exec();
    return foundList.sort({ [sortField]: sortOrder }).exec();
  }

  async findOne(id: string, userId: string) {
    return await this.todoModel.findOne({ id, authorId: userId }).exec();
  }

  async create(createTodoDto: TodoType.TodoCreateRequestDto, authorId: string) {
    return await new this.todoModel({
      ...createTodoDto,
      authorId,
    }).save();
  }

  async update(id: string, updateTodoDto: TodoType.TodoUpdateRequestDto) {
    return await this.todoModel
      .findOneAndUpdate({ id }, updateTodoDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    await this.todoModel.findOneAndDelete({ id }).exec();
    return;
  }
}
