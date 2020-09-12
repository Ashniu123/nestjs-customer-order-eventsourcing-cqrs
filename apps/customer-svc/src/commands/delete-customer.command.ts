import { ICommand } from '@nestjs/cqrs';

export class DeleteCustomerCommand implements ICommand {
  constructor(readonly customerId: string) {}
}
