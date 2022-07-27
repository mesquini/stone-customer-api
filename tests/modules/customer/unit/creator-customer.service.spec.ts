import { DeepMocked, createMock } from '@golevelup/ts-jest';

import ICustomerDao from '@modules/customer/domain/repositories/interfaces/icustomer.dao';
import CreatorCustomerService from '@modules/customer/services/creator-customer.service';
import ICreatorCustomerService from '@modules/customer/services/interfaces/icreator-customer.service';
import { customer1 } from '../mocks/customer-mock';

let customerDaoMock: DeepMocked<ICustomerDao>;
let creatorCustomerService: ICreatorCustomerService;

describe('Creator customer', () => {
  beforeAll(() => {
    customerDaoMock = createMock<ICustomerDao>();

    creatorCustomerService = new CreatorCustomerService(customerDaoMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should be create new customer', async () => {
    const data = {
      name: customer1.name,
      document: customer1.document,
    };

    jest.spyOn(customerDaoMock, 'create').mockResolvedValue(customer1);

    await expect(creatorCustomerService.create(data)).resolves.toEqual(
      customer1,
    );
  });
});
