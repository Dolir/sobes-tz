import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoType } from '@slice';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;
@Schema({ timestamps: true })
export class Todo implements TodoType.TodoSchema {
  @Prop({ default: randomUUID })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  authorId: string;

  @Prop({ default: false })
  done?: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
