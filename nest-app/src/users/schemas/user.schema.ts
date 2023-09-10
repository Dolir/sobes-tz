import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '@slice';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User implements UserType.UserSchema {
  @Prop({ default: randomUUID })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
