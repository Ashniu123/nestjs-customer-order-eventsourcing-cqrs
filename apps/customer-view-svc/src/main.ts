import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.CUSTOMERS_VIEW_SVC_PORT || 3002;
  await app.listen(port);
  logger.log(
    `Application listening of ${port} in "${process.env.NODE_ENV}" mode`,
  );
}
bootstrap();
