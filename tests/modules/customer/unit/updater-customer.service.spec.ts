import { DeepMocked, createMock } from '@golevelup/ts-jest';

import ICustomerDao from '@modules/customer/domain/repositories/interfaces/icustomer.dao';
import UpdaterCustomerService from '@modules/customer/services/updater-customer.service';
import IUpdaterCustomerService from '@modules/customer/services/interfaces/iupdater-customer.service';
import { customer1 } from '../mocks/customer-mock';

let customerDaoMock: DeepMocked<ICustomerDao>;
let updaterCustomerService: IUpdaterCustomerService;

describe('Updater customer', () => {
  beforeAll(() => {
    customerDaoMock = createMock<ICustomerDao>();

    updaterCustomerService = new UpdaterCustomerService(customerDaoMock);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should be update one customer by id', async () => {
    jest.spyOn(customerDaoMock, 'update').mockResolvedValue(customer1);

    await expect(updaterCustomerService.update(customer1)).resolves.toEqual(
      customer1,
    );
  });
});
