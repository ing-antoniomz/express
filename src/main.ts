import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    //origin: '*' // permite cualquier origen
    origin: 'http://localhost:4200' // opción más segura: solo tu frontend
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
