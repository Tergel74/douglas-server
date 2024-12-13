import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Conversation } from './conversation.model';

@Schema({ timestamps: true })
export class Context {
  @Prop({ required: true })
  context: string;

  @Prop({ enum: ['en', 'mn'], default: 'en' })
  language: string;

  // @Prop({ enum: [''], default: 'эр' })
  // type: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }])
  conversations: [Conversation];
}
