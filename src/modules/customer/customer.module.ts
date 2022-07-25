import { Module } from '@nestjs/common';

import DITokens from '@common/enums/DITokens';
import CustomerController from './customer.controller';
import CustomerDatabaseDao from './domain/repositories/customer.database.dao';
import CreatorCustomerService from './services/creator-customer.service';
import GetterCustomerService from './services/getter-customer.service';
import UpdaterCustomerService from './services/updater-customer.service';

@Module({
  imports: [CustomerModule],
  controllers: [CustomerController],
  providers: [
    {
      provide: DITokens.CustomerCreatorService,
      useClass: CreatorCustomerService,
    },
    {
      provide: DITokens.CustomerGetterService,
      useClass: GetterCustomerService,
    },
    {
      provide: DITokens.CustomerUpdaterService,
      useClass: UpdaterCustomerService,
    },
    {
      provide: DITokens.CustomerDatabaseDao,
      useClass: CustomerDatabaseDao,
    },
  ],
})
export class CustomerModule {}
