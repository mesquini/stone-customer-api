import { ICreateCustomerPayload } from '@modules/customer/services/interfaces/icreator-customer.service';
import { ICustomerUpdatePayload } from '@modules/customer/services/interfaces/iupdater-customer.service';
import { CustomerEntity } from '../../entities/customer.entity';

export default interface ICustomerDao {
  getById(id: string): Promise<CustomerEntity>;

  create(data: ICreateCustomerPayload): Promise<CustomerEntity>;

  update(data: ICustomerUpdatePayload): Promise<CustomerEntity>;
}
