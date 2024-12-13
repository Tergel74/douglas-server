import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth.guard';
import { SolveService } from './solve.service';
import { SolveDto } from './dto/solve.dto';
import { Request } from 'express';

@Controller('Solve')
@UseGuards(AuthMiddleware)
export class SolveController {
  constructor(private readonly solveService: SolveService) {}

  @Post('solve')
  async solve(@Body() solveDto: SolveDto) {
    return await this.solveService.solve(solveDto);
  }

  @Post('solve:id')
  async solveConversation(@Body() solveDto: SolveDto, @Req() req: Request) {
    return await this.solveService.solveConversation(solveDto, req);
  }
}
