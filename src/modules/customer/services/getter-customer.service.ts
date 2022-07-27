import DITokens from '@common/enums/DITokens';
import { NotFoundError } from '@common/errors/not-found.error';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../domain/entities/customer.entity';
import CustomerErrors from '../domain/errors/customer.error';
import ICustomerDao from '../domain/repositories/interfaces/icustomer.dao';
import IGetterCustomerService from './interfaces/igetter-customer.service';

@Injectable()
export default class GetterCustomerService implements IGetterCustomerService {
  constructor(
    @Inject(DITokens.CustomerDatabaseDao)
    private readonly customerDatabaseDao: ICustomerDao,
  ) {}

  async getById(id: string): Promise<CustomerEntity> {
    const customer = await this.customerDatabaseDao.getById(id);

    if (!customer) {
      throw new NotFoundError(CustomerErrors.CUSTOMER_NOT_FOUND);
    }

    return customer;
  }
}
