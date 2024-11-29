import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hi, I'm Douglas, your friendly study assistant! 🔮🪄";
  }
}
