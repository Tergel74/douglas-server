import { Injectable } from '@nestjs/common';
import { SolveDto } from './dto/solve.dto';

@Injectable()
export class SolveService {
  async solve(data: SolveDto) {}
}
