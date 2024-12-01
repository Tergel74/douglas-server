import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  setupSwagger(app);
  app.use(cookieParser());
  await app.listen(process.env.PORT);

  console.log(`Listening: ${process.env.PORT}`);
}
bootstrap();
