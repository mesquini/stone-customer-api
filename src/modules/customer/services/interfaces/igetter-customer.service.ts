import { CustomerEntity } from '@modules/customer/domain/entities/customer.entity';

export default interface IGetterCustomerService {
  getById(id: string): Promise<CustomerEntity>;
}
