import { ICommand } from '@nestjs/cqrs';
import { CreateCustomerDto } from '@customer/customer-common/create-customer.dto';

export class CreateCustomerCommand implements ICommand {
  constructor(
    readonly customerId: string,
    readonly createCustomerDto: CreateCustomerDto,
  ) {}
}
