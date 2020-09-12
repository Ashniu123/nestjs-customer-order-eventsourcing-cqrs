import { IEvent } from '@nestjs/cqrs';

export class DeleteCustomerEvent implements IEvent {
  constructor(readonly customerId: string) {}
}
