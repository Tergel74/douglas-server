import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from 'src/firebase.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
})
export class AuthModule {}
