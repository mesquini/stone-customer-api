import CacheService from '@common/cache/cache.service';
import { NotFoundError } from '@common/errors/not-found.error';
import { ICreateCustomerPayload } from '@modules/customer/services/interfaces/icreator-customer.service';
import { ICustomerUpdatePayload } from '@modules/customer/services/interfaces/iupdater-customer.service';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CustomerEntity } from '../entities/customer.entity';
import CustomerErrors from '../errors/customer.error';
import ICustomerDao from './interfaces/icustomer.dao';

@Injectable()
export default class CustomerDatabaseDao implements ICustomerDao {
  constructor(private cacheClient: CacheService) {}

  getById(id: string): Promise<CustomerEntity> {
    return this.cacheClient.recover(`customer:${id}`);
  }

  async create(data: ICreateCustomerPayload): Promise<CustomerEntity> {
    const id = uuid();

    const payload = {
      id,
      ...data,
    };

    await this.cacheClient.save(`customer:${id}`, payload);

    return payload;
  }

  async update(data: ICustomerUpdatePayload): Promise<CustomerEntity> {
    const customer = await this.getById(data.id);

    if (!customer) {
      throw new NotFoundError(CustomerErrors.CUSTOMER_NOT_FOUND);
    }

    Object.assign(customer, data);

    await this.cacheClient.save(`customer:${data.id}`, customer);

    return customer;
  }
}
