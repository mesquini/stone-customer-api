import DITokens from '@common/enums/DITokens';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../domain/entities/customer.entity';
import ICustomerDao from '../domain/repositories/interfaces/icustomer.dao';
import IUpdaterCustomerService, {
  ICustomerUpdatePayload,
} from './interfaces/iupdater-customer.service';

@Injectable()
export default class UpdaterCustomerService implements IUpdaterCustomerService {
  constructor(
    @Inject(DITokens.CustomerDatabaseDao)
    private readonly customerDatabaseDao: ICustomerDao,
  ) {}

  update(data: ICustomerUpdatePayload): Promise<CustomerEntity> {
    return this.customerDatabaseDao.update(data);
  }
}
