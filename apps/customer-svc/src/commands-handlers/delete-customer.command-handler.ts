import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CustomerAdapter } from '../customer.adapter';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerCommandHandler
  implements ICommandHandler<DeleteCustomerCommand> {
  private logger = new Logger('DeleteCustomerCommandHandler');

  constructor(
    private readonly customerAdapter: CustomerAdapter,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteCustomerCommand) {
    this.logger.debug(
      `Running command handler with: ${JSON.stringify(command)}`,
    );

    const { customerId } = command;
    const customer = this.publisher.mergeObjectContext(
      await this.customerAdapter.deleteCustomer(customerId),
    );
    customer.commit();
  }
}
