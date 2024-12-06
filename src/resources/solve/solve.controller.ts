import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth.guard';
import { SolveService } from './solve.service';
import { SolveDto } from './dto/solve.dto';

@Controller('Solve')
@UseGuards(AuthMiddleware)
export class SolveController {
  constructor(private readonly solveService: SolveService) {}

  @Post('solve')
  async solve(@Body() solveDto: SolveDto) {
    return await this.solveService.solve(solveDto);
  }
}
