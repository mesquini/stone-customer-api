import { DeepMocked, createMock } from '@golevelup/ts-jest';
import CustomerErrors from '@modules/customer/domain/errors/customer.error';

import ICustomerDao from '@modules/customer/domain/repositories/interfaces/icustomer.dao';
import GetterCustomerService from '@modules/customer/services/getter-customer.service';
import IGetterCustomerService from '@modules/customer/services/interfaces/igetter-customer.service';
import { customer1 } from '../mocks/customer-mock';

let customerDaoMock: DeepMocked<ICustomerDao>;
let getterCustomerService: IGetterCustomerService;

describe('Getter customer', () => {
  beforeAll(() => {
    customerDaoMock = createMock<ICustomerDao>();

    getterCustomerService = new GetterCustomerService(customerDaoMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should get one customer by id', async () => {
    jest.spyOn(customerDaoMock, 'getById').mockResolvedValue(customer1);

    await expect(getterCustomerService.getById(customer1.id)).resolves.toEqual(
      customer1,
    );
  });

  it('Should not find customer', async () => {
    jest.spyOn(customerDaoMock, 'getById').mockResolvedValue(null as any);

    await expect(
      getterCustomerService.getById('undefined'),
    ).rejects.toThrowError(CustomerErrors.CUSTOMER_NOT_FOUND);
  });
});
