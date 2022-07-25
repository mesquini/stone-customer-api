import { CustomerEntity } from '@modules/customer/domain/entities/customer.entity';

export interface ICustomerUpdatePayload {
  id: string;
  name?: string;
  document?: number;
}

export default interface IUpdaterCustomerService {
  update(data: ICustomerUpdatePayload): Promise<CustomerEntity>;
}
