import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Context } from './context.model';
import { Question } from './question.model';

@Schema({ timestamps: true })
export class Conversation {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }])
  questions: [Question];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }])
  responses: [Response];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  context: Context;
}
