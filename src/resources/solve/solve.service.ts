import { Injectable } from '@nestjs/common';
import { SolveDto } from './dto/solve.dto';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './model/conversation.model';
import { Model } from 'mongoose';
import { Question } from './model/question.model';
import { Context } from './model/context.model';
import { Response } from './model/response.model';
import { ChatService } from 'src/chat.service';

@Injectable()
export class SolveService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    @InjectModel(Response.name) private readonly responseModel: Model<Response>,
    @InjectModel(Context.name) private readonly contextModel: Model<Context>,
    private readonly chatService: ChatService,
  ) {}
  async solve(data: SolveDto) {
    try {
      const newQuestion = await this.questionModel.create({
        question: data.problem,
      });
      const context = await this.contextModel.findOne({ where: { id: '' } });
      const chatResponse = this.chatService.sendChat(
        context.context,
        '',
        data.problem,
      );
      const newResponse = await this.responseModel.create(data.problem);
      const newConversation = await this.conversationModel.create({
        questions: [newQuestion],
        responses: [chatResponse],
        context: context,
      });
      newQuestion.conversation = newConversation;
      newResponse.conversation = newConversation;
      context.conversations.push(newConversation);

      await newQuestion.save();
      await newResponse.save();
      await context.save();
    } catch (error) {
      console.error('Error getting response from LLM: ', error);
    }
  }
  async solveConversation(data: SolveDto, req: Request) {
    try {
      const conversationId = req.params.id;
    } catch (error) {
      console.error('Error getting response from LLM: ', error);
    }
  }
}
