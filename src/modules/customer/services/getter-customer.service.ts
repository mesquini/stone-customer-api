import DITokens from '@common/enums/DITokens';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../domain/entities/customer.entity';
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
      // retornar erro not found
    }

    return customer;
  }
}
