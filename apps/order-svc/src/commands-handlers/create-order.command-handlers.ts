import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateOrderCommand } from '../commands/create-order.command';
import { OrderAdapter } from '../order.adapter';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand> {
  private logger = new Logger('CreateOrderCommandHandler');

  constructor(
    private readonly orderAdapter: OrderAdapter,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    this.logger.debug(
      `Running command handler with: ${JSON.stringify(command)}`,
    );

    const { orderId, createOrderDto } = command;
    const order = this.publisher.mergeObjectContext(
      await this.orderAdapter.createOrder(orderId, createOrderDto),
    );
    order.commit(); // Publish event
  }
}
