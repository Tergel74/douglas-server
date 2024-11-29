import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase.service';
import { SolveController } from './solve.controller';
import { SolveService } from './solve.service';

@Module({
  imports: [],
  controllers: [SolveController],
  providers: [SolveService, FirebaseService],
})
export class SolveModule {}
