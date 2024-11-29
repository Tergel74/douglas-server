import { Controller, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth.guard';

@Controller('Solve')
@UseGuards(AuthMiddleware)
export class SolveController {}
