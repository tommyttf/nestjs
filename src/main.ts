import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`Started server at port ${port}`);
  })
  .catch((err) => {
    console.log('err : ', err);
  });
