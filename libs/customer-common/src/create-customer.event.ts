import { IEvent } from '@nestjs/cqrs';
import { CreateCustomerDto } from '@customer/customer-common/create-customer.dto';

export class CreateCustomerEvent implements IEvent {
  constructor(
    readonly customerId: string,
    readonly createCustomerDto: CreateCustomerDto,
  ) {}
}
