import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderDto } from '@order/order-common/create-order.dto';
import { v4 as uuid } from 'uuid';
import { CreateOrderCommand } from './commands/create-order.command';

@Injectable()
export class AppService {
  constructor(private readonly commandBus: CommandBus) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<{ id: string }> {
    const id = uuid();
    await this.commandBus.execute(new CreateOrderCommand(id, createOrderDto));
    return { id };
  }
}
