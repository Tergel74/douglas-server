import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Conversation } from './conversation.model';

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' })
  conversation: Conversation;
}
