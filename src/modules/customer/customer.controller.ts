import { JwtAuth } from '@common/auth/decorators/jwt-auth.decorator';
import DITokens from '@common/enums/DITokens';
import { ConflictError } from '@common/errors/conflict.error';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCustomerDto } from './domain/dtos/create-customer.dto';
import UpdateCustomerDto from './domain/dtos/update-customer.dto';
import { CustomerEntity } from './domain/entities/customer.entity';
import CustomerErrors from './domain/errors/customer.error';
import ICreatorCustomerService from './services/interfaces/icreator-customer.service';
import IGetterCustomerService from './services/interfaces/igetter-customer.service';
import IUpdaterCustomerService from './services/interfaces/iupdater-customer.service';

@Controller('customers')
@ApiTags('Customer')
@ApiBearerAuth()
@JwtAuth()
export default class CustomerController {
  constructor(
    @Inject(DITokens.CustomerCreatorService)
    private readonly customerCreatorService: ICreatorCustomerService,
    @Inject(DITokens.CustomerGetterService)
    private readonly customerGetterService: IGetterCustomerService,
    @Inject(DITokens.CustomerUpdaterService)
    private readonly customerUpdaterService: IUpdaterCustomerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create one customer' })
  @ApiCreatedResponse({
    type: CustomerEntity,
  })
  create(@Body() data: CreateCustomerDto): Promise<CustomerEntity> {
    return this.customerCreatorService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one customer by Id' })
  @ApiOkResponse({
    type: CustomerEntity,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    if (data.id !== id)
      throw new ConflictError(CustomerErrors.CUSTOMER_CONFLICT_ID);

    return this.customerUpdaterService.update({ id, ...data });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one customer by ID' })
  @ApiOkResponse({
    type: CustomerEntity,
  })
  getById(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customerGetterService.getById(id);
  }
}
