import { CustomerEntity } from '@modules/customer/domain/entities/customer.entity';

export interface ICreateCustomerPayload {
  name: string;
  document: number;
}

export default interface ICreatorCustomerService {
  create(data: ICreateCustomerPayload): Promise<CustomerEntity>;
}
