import { CacheModule } from '@common/cache/cache.module';
import { ExceptionModule } from '@common/expections/exception.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ExceptionModule,
    CacheModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
