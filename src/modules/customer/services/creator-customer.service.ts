import DITokens from '@common/enums/DITokens';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../domain/entities/customer.entity';
import ICustomerDao from '../domain/repositories/interfaces/icustomer.dao';
import ICreatorCustomerService, {
  ICreateCustomerPayload,
} from './interfaces/icreator-customer.service';

@Injectable()
export default class CreatorCustomerService implements ICreatorCustomerService {
  constructor(
    @Inject(DITokens.CustomerDatabaseDao)
    private readonly customerDatabaseDao: ICustomerDao,
  ) {}

  create(data: ICreateCustomerPayload): Promise<CustomerEntity> {
    return this.customerDatabaseDao.create(data);
  }
}
