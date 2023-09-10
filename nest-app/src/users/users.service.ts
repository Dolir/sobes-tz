import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(name: string) {
    return this.userModel.findOne({ name });
  }

  async createOne({ name, password }: { name: string; password: string }) {
    return this.userModel.create({ name, password });
  }
}
