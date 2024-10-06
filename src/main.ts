import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables automatic transformation of query and route parameters
      transformOptions: { enableImplicitConversion: true }, // Enables implicit conversion of query parameters to their expected types
    }),
  );
  await app.listen(3000);
}
bootstrap();
