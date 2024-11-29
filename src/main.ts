import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupSwagger(app);
  await app.listen(process.env.PORT);

  console.log(`Listening: ${process.env.PORT}`);
}
bootstrap();
