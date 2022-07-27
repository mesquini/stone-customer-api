import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Customer API')
    .setDescription('')
    .setVersion(process.env.npm_package_version)
    .addTag('Customer')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3333;

  await app
    .listen(port, () => {
      Logger.log(
        `>>>> Starting ${process.env.NODE_ENV} on PORT ${port}`,
        'APP',
      );
    })
    .catch((err) => Logger.error(err));
}

bootstrap();
