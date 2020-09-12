import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { Logger } from '@nestjs/common';
import { CustomerAdapter } from '../customer.adapter';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand> {
  private logger = new Logger('CreateCustomerCommandHandler');

  constructor(
    private readonly customerAdapter: CustomerAdapter,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCustomerCommand) {
    this.logger.debug(
      `Running command handler with: ${JSON.stringify(command)}`,
    );

    const { customerId, createCustomerDto } = command;
    const customer = this.publisher.mergeObjectContext(
      await this.customerAdapter.createCustomer(customerId, createCustomerDto),
    );
    customer.commit();
  }
}
